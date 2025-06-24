import AudioRecorder from '../components/AudioRecorder';
import { NameRecordingDialog } from '../components/NameRecordingDialog';
import { useRecordingContext } from '../context/RecordingContext';
import { useState } from 'react';

export default function RecorderPage() {
  const { addRecording } = useRecordingContext();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [pendingBlob, setPendingBlob] = useState<Blob | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  const handleRecordingStop = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    setObjectUrl(url);
    setPendingBlob(blob);
    setDialogVisible(true);
  };

  const handleSave = (name: string) => {
    if (!objectUrl) return;
    addRecording(objectUrl, name);
    clearDialog();
  };

  const handleDiscard = () => {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    clearDialog();
  };

  const clearDialog = () => {
    setDialogVisible(false);
    setPendingBlob(null);
    setObjectUrl(null);
  };

  return (
    <div className="space-y-6">
  
      <AudioRecorder onStop={handleRecordingStop} />

      {dialogVisible && objectUrl && (
        <NameRecordingDialog
          url={objectUrl}
          onSave={(name) => handleSave(name)}
          onCancel={clearDialog}
          onDiscard={handleDiscard}
        />
      )}
    </div>
  );
}
