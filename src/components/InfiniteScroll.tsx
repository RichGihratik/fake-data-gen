import { CircularProgress } from '@mui/material';
import { useEffect, useRef } from 'react';
import { debounce } from 'lodash';

type Props = {
  disabled?: boolean;
  onShow: () => void;
};

const delay = 400;

export function InfiniteScroll({ disabled: _dis, onShow }: Props) {
  const progress = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      debounce(([entry]) => {
        if (!(_dis ?? false) && entry.isIntersecting) onShow();
      }, delay),
      {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      },
    );

    if (progress.current) observer.observe(progress.current);

    return () => {
      if (progress.current) observer.unobserve(progress.current);
    };
  }, [progress, _dis, onShow]);

  return (
    <div
      className="flex-1 w-full h-20 flex justify-center items-center"
      ref={progress}
    >
      <CircularProgress />
    </div>
  );
}
