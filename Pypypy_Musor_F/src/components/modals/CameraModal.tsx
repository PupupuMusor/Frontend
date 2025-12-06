import React, { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAnalyzeImageMutation } from "@/features/aiApi";
import type { PredictionResponse } from "@/types/ai";
import { formatAiResult } from "@/utils/formatAiResult";
import { useGetAllUsersQuery } from "@/features/userApi";

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
    wasteType?: string;
    recognized: boolean;
  } | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [analyzeImage, { isLoading }] = useAnalyzeImageMutation();
  const { data: users = [] } = useGetAllUsersQuery();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredUsers = users.filter((user) =>
    user.nickname.toLowerCase().includes(nickname.toLowerCase())
  );
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || resultText) return;

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
      } catch {
        alert("Не удалось получить доступ к камере");
      }
    };

    startCamera();

    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };
  }, [isOpen, resultText]);

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
    if (!file || !nickname || isLoading) return;

    const result: PredictionResponse = await analyzeImage(file).unwrap();
    onSubmit(nickname, result);

    const formatted = formatAiResult(result);
    setResultText(formatted);
  };

  const resetAndRetry = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setPhoto(null);
    setFile(null);
    setResultText(null);
  };
  

  const fullReset = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setNickname("");
    setPhoto(null);
    setFile(null);
    setResultText(null);
  };

  if (!isOpen) return null;

  // Маппинг типов мусора на названия файлов изображений
  const getImageForWasteType = (type: string = 'plastic') => {
    const imageMap: Record<string, string> = {
      plastic: '/plastic.jpg',
      paper: '/paper.jpg',
      organic: '/organic.jpg',
      glass: '/glass.jpg',
      metal: '/glass.jpg',
    };
    return imageMap[type] || '/plastic.jpg';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-2xl relative text-center max-h-[90vh] overflow-y-auto">

        <button
          className="absolute top-6 right-6 text-gray-400 hover:text-black text-3xl z-10"
            onClick={() => {
              fullReset();
              onClose();
            }}
        >
          ×
        </button>

        {!resultText && (
          <>
            <h2 className="text-3xl font-bold mb-6">Сделайте фото отхода</h2>

            <div className="mb-6 relative">
              {!photo && (
                <video
                  ref={videoRef}
                  className="w-full rounded-2xl mb-4 max-h-[50vh] object-cover"
                  autoPlay
                  playsInline
                />
              )}

              {photo && (
                <img
                  src={photo}
                  alt="preview"
                  className="w-full rounded-2xl mb-4 max-h-[50vh] object-cover"
                />
              )}
            </div>
            <div className="relative mb-6">
              <Input
                type="text"
                placeholder="Введите ваш никнейм"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                  setShowSuggestions(true);
                }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                className="text-lg py-3 px-4"
              />

              {showSuggestions && filteredUsers.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border rounded-xl mt-2 max-h-48 overflow-y-auto z-20 shadow-lg">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
                      onClick={() => {
                        setNickname(user.nickname);
                        setShowSuggestions(false);
                      }}
                    >
                      {user.nickname}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              {!photo ? (
                <Button
                  className="w-full py-6 text-lg bg-yellow-400 hover:bg-yellow-500 transition-all"
                  onClick={takePhoto}
                  disabled={!nickname}
                >
                  <Camera className="mr-3 h-6 w-6" /> Сделать фото
                </Button>
              ) : (
                <Button
                  className="w-full py-6 text-lg bg-green-500 hover:bg-green-600 transition-all"
                  onClick={sendToAI}
                  disabled={isLoading}
                >
                  {isLoading ? "Распознаю..." : "Отправить на распознавание"}
                </Button>
              )}
            </div>
          </>
        )}

        {resultText && (
          <div className="text-center space-y-6">
            <h2 className={`text-3xl font-bold ${!resultText.recognized ? 'text-red-500' : ''}`}>
              {resultText.title}
            </h2>
            
            {/* Отображение картинки ТОЛЬКО если удалось распознать */}
            {resultText.recognized && resultText.wasteType && (
              <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-4">
                <img
                  src={getImageForWasteType(resultText.wasteType)}
                  alt={resultText.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="bg-gray-50 rounded-xl p-5">
              <p className="text-xl font-semibold text-gray-800 mb-3">
                {resultText.container}
              </p>
              {resultText.advice && (
                <p className="text-gray-600 whitespace-pre-line text-lg leading-relaxed">
                  {resultText.advice}
                </p>
              )}
            </div>

            <div className="space-y-4 pt-4">
              <Button
                className="w-full py-6 text-lg bg-yellow-400 hover:bg-yellow-500 transition-all"
                onClick={resetAndRetry}
              >
                Сфотографировать ещё
              </Button>

              <Button
                className="w-full py-6 text-lg bg-gray-200 hover:bg-gray-300 text-black transition-all"
                onClick={() => {
                  fullReset();
                  onClose();
                }}
              >
                Закрыть
              </Button>
            </div>
          </div>
        )}
        
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};