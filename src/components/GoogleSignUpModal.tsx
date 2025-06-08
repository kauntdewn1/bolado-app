import React, { useEffect, useRef } from 'react';

interface GoogleSignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoogleSignUp: () => Promise<void>; // Assuming this is for Google
}

const GoogleSignUpModal: React.FC<GoogleSignUpModalProps> = ({ isOpen, onClose, onGoogleSignUp }) => {
  if (!isOpen) {
    return null;
  }

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={handleOverlayClick}>
      <div ref={modalRef} className="bg-black p-8 border border-white/10 text-center">
        {/* Removed generic title */}
        <button
            onClick={onGoogleSignUp}
            className="w-full bg-gray-800 text-white font-bold py-3 px-6 rounded-full uppercase tracking-wider flex items-center justify-center space-x-2 border border-purple-500 hover:bg-purple-700"
          >
            {/* Placeholder for Google Icon - you would replace this with an actual SVG or icon component */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM12 4.70588C14.4087 4.70588 16.2512 5.75684 17.3537 6.73693L20.2969 3.7937C18.4306 2.02957 15.8392 1.05882 12 1.05882C7.66125 1.05882 3.96496 3.03232 2.1875 6.15L5.6875 8.375C6.68154 5.8914 9.06851 4.70588 12 4.70588ZM12 7.35294C10.5251 7.35294 9.25876 8.06413 8.625 9.17545L5.125 6.95C6.83998 4.65251 9.24149 3.52941 12 3.52941C14.0979 3.52941 15.8856 4.34764 17.0312 5.5625L14.1562 8.4375C13.4356 7.74799 12.7331 7.35294 12 7.35294ZM12 9.41176C11.2201 9.41176 10.5497 9.76001 10.2188 10.2933L7 12.2933C7.96875 14.2381 9.98878 15.2941 12 15.2941C13.0839 15.2941 14.0293 15.0085 14.625 14.4062L17.5 17.2812C15.8279 18.9747 13.7199 19.9412 12 19.9412C9.33875 19.9412 6.96496 18.7677 5.1875 15.65L8.6875 13.425C9.68154 15.9086 12.0685 17.0941 14 17.0941C15.9021 17.0941 17.6144 16.2764 18.76 15.0625L21.635 17.9375C19.8621 19.7104 17.7541 20.6769 15.0938 20.6769L12 20.6769C9.90214 20.6769 8.1144 19.8592 6.96875 18.6443L4.09375 21.5193C5.86664 23.2922 7.9746 24.2587 10.635 24.2587L12 24.2587C16.6274 24.2587 20.6875 22.4274 20.6875 18.0417C20.6875 17.1632 20.5284 16.3133 20.2462 15.5115L18.76 14.0312C19.6161 12.5833 20.125 10.8947 20.125 9.41176C20.125 7.66125 19.5294 6.16125 18.5882 5.04125L15.7132 7.91625C16.5279 8.73095 17.0941 9.76001 17.0941 11.2353L14.0625 11.2353C14.0625 12.3191 13.7769 13.2645 13.1746 13.8592L10.2996 10.9842C10.8943 10.3819 11.8397 10.0963 12.9235 10.0963L15.8485 10.0963C15.8485 9.31636 15.4997 8.64596 14.9663 8.31508L12.9663 5.10008C13.5325 4.46633 14.2381 4.0625 15.0625 4.0625C15.9021 4.0625 16.6144 4.44027 17.2091 5.035L20.0841 2.16C18.3112 0.38714 16.2032 -0.579398 13.542 -0.579398H12Z\"/></svg>
            Entrar com Google
          </button>
        {/* Removed Fechar button - relying on overlay click and Escape */}
        <p className="mt-6 text-gray-400 text-xs uppercase tracking-wider">
          ao entrar, você aceita os termos do ritual
        </p>
      </div>
    </div>
  );
};
export default GoogleSignUpModal;