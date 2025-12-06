import React, { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAnalyzeImageMutation } from "@/features/aiApi";
import type { PredictionResponse } from "@/types/ai";
import { formatAiResult } from "@/utils/formatAiResult";

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (nickname: string, result: PredictionResponse) => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [nickname, setNickname] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [resultText, setResultText] = useState<{
    title: string;
    container: string;
    advice: string;
  } | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [analyzeImage, { isLoading }] = useAnalyzeImageMutation();

  useEffect(() => {
    if (!isOpen) return;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (error) {
        console.error("Ошибка доступа к камере:", error);
        alert("Не удалось получить доступ к камере");
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen]);

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageBase64 = canvas.toDataURL("image/jpeg");
    setPhoto(imageBase64);

    fetch(imageBase64)
      .then((res) => res.blob())
      .then((blob) => {
        const imageFile = new File([blob], "photo.jpg", {
          type: "image/jpeg",
        });
        setFile(imageFile);
      });
  };

  const sendToAI = async () => {
    if (!file || !nickname) return;

    try {
      const result: PredictionResponse = await analyzeImage(file).unwrap();

      onSubmit(nickname, result);

      const formatted = formatAiResult(result);
      setResultText(formatted);
    } catch (err) {
      console.error("Ошибка анализа:", err);
      alert("Ошибка при распознавании изображения");
    }
  };

  const resetAndRetry = () => {
    setPhoto(null);
    setFile(null);
    setResultText(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md relative text-center">

        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl"
          onClick={onClose}
        >
          ×
        </button>

        {!resultText && (
          <>
            <h2 className="text-2xl font-bold mb-3">Сделайте фото отхода</h2>

            {!photo && (
              <video
                ref={videoRef}
                className="w-full rounded-xl mb-4"
                autoPlay
                playsInline
              />
            )}

            {photo && (
              <img
                src={photo}
                alt="preview"
                className="w-full rounded-xl mb-4"
              />
            )}

            <Input
              type="text"
              placeholder="Введите никнейм"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="mb-4"
            />

            {!photo ? (
              <Button
                className="w-full mb-2 bg-yellow-400 hover:bg-yellow-500"
                onClick={takePhoto}
                disabled={!nickname}
              >
                <Camera className="mr-2" /> Сделать фото
              </Button>
            ) : (
              <Button
                className="w-full bg-green-500 hover:bg-green-600"
                onClick={sendToAI}
                disabled={isLoading}
              >
                {isLoading ? "Распознаю..." : "Отправить на распознавание"}
              </Button>
            )}
          </>
        )}
        {resultText && (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">{resultText.title}</h2>
            <p className="text-lg font-semibold">{resultText.container}</p>
            <p className="text-gray-600 whitespace-pre-line">
              {resultText.advice}
            </p>
            

            <Button
              className="w-full mt-2 bg-yellow-400 hover:bg-yellow-500"
              onClick={resetAndRetry}
            >
              Сфотографировать ещё
            </Button>

            <Button
              className="w-full bg-gray-200 hover:bg-gray-300 text-black"
              onClick={onClose}
            >
              Закрыть
            </Button>
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};
