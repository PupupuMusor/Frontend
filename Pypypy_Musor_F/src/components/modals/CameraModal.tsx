import React, { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (nickname: string, photo: string) => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [nickname, setNickname] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

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
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md relative text-center">

        {/* Крестик */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl"
          onClick={onClose}
        >
          ×
        </button>

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
            onClick={() => {
              onSubmit(nickname, photo);
              setNickname("");
              setPhoto(null);
              onClose();
            }}
          >
            Отправить на распознавание
          </Button>
        )}

        {/* canvas скрытый */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};
