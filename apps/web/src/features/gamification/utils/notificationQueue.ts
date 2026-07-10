import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { QueuedToast } from '../types';

const toastQueue: QueuedToast[] = [];
let isProcessingQueue = false;

const processToastQueue = () => {
  if (toastQueue.length === 0) {
    isProcessingQueue = false;
    return;
  }

  isProcessingQueue = true;
  const item = toastQueue.shift()!;

  toast.success(item.title, {
    description: item.description,
    duration: item.duration,
  });

  if (item.confettiColors) {
    try {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: item.confettiColors,
      });
    } catch (e) {
      console.error('Failed to trigger confetti', e);
    }
  }

  setTimeout(processToastQueue, 1500);
};

export const enqueueToast = (item: QueuedToast) => {
  toastQueue.push(item);
  if (!isProcessingQueue) {
    processToastQueue();
  }
};
