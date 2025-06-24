import React, { useRef, useState, useEffect } from "react";
import { useRecordingContext } from "../context/RecordingContext";
import { useToast } from "./useToast";
import { Mic, PauseCircle, PlayCircle, StopCircle } from 'lucide-react';
import { motion } from "framer-motion";

const formatTime = (seconds: number): string => {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
};

interface RecorderProps {
  onStop: (blob: Blob) => void;
}

const AudioRecorder: React.FC<RecorderProps> = ({onStop}) => {
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationIdRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<number>(0);

  // const { addRecording } = useRecordingContext();

  const { toast, triggerToast } = useToast(3000); // 3s duration

  const drawVisualizer = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      ctx.fillStyle = document.documentElement.classList.contains("dark")
        ? "#1e293b"
        : "#f8fafc";
      animationIdRef.current = requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);

      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = "#ef4444";
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    draw();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;

      source.connect(analyser);
      audioContextRef.current = audioContext;
      sourceRef.current = source;
      analyserRef.current = analyser;

      drawVisualizer();

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        onStop(audioBlob);
        cancelAnimationFrame(animationIdRef.current!);
        audioContext.close();
        clearInterval(timerRef.current);
        setRecordingTime(0);
      };

      mediaRecorder.start();
      setRecording(true);
      setPaused(false);

      timerRef.current = window.setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Microphone access error:", err);
      triggerToast("Can't access microphone ");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setPaused(false);
    setRecording(false);
  };
  const pauseRecording = () => {
    if (mediaRecorderRef?.current?.state === "recording") {
      mediaRecorderRef.current.pause();
      setPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef?.current?.state === "paused") {
      mediaRecorderRef.current.resume();
      setPaused(false);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = 100;
  }, []);

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col items-center justify-center space-y-6 px-4 dark:bg-zinc-800">
      {toast}
      <h1 className="text-2xl font-semibold">Audio Recorder</h1>
      <div className="flex items-center justify-center gap-4">
        {!recording && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="p-5 rounded-full border-4 border-zinc-300 bg-white dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 shadow-md transition-colors duration-200"
            onClick={startRecording}
            aria-label="Start Recording"
          >
            <Mic className="text-zinc-800 dark:text-zinc-100 w-8 h-8" />
          </motion.button>
        )}

        {recording && !paused && (
          <>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-5 rounded-full border-4 border-neutral-500 bg-neutral-100 dark:bg-neutral-900 shadow-md transition-colors duration-200"
              onClick={pauseRecording}
              aria-label="Pause Recording"
            >
              <PauseCircle className="text-neutral-600 w-8 h-8" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-5 rounded-full border-4 border-red-600 bg-red-100 dark:bg-red-900 shadow-md transition-colors duration-200"
              onClick={stopRecording}
              aria-label="Stop Recording"
            >
              <StopCircle className="text-red-600 w-8 h-8" />
            </motion.button>
          </>
        )}

        {recording && paused && (
          <>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-5 rounded-full border-4 border-neutral-600 bg-neutral-100 dark:bg-neutral-900 shadow-md transition-colors duration-200"
              onClick={resumeRecording}
              aria-label="Resume Recording"
            >
              <PlayCircle className="text-neutral-600 w-8 h-8" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-5 rounded-full border-4 border-red-600 bg-red-100 dark:bg-red-900 shadow-md transition-colors duration-200"
              onClick={stopRecording}
              aria-label="Stop Recording"
            >
              <StopCircle className="text-red-600 w-8 h-8" />
            </motion.button>
          </>
        )}
      </div>
      {recording && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="text-xs text-zinc-500 dark:text-zinc-400"
        >
          {formatTime(recordingTime)}
        </motion.p>
      )}
      <div className="w-full max-w-md">
        <canvas
          ref={canvasRef}
          className="w-full rounded bg-white dark:bg-zinc-800 shadow"
        />
      </div>
      {audioURL && (
        <audio controls src={audioURL} className="w-full max-w-xs mt-4">
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default AudioRecorder;
