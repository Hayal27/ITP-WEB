import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { FiRefreshCw } from 'react-icons/fi';

interface CaptchaProps {
    onVerify: (isValid: boolean) => void;
    className?: string;
}

export interface CaptchaHandle {
    reset: () => void;
    validate: (userInput: string) => boolean;
}

const Captcha = forwardRef<CaptchaHandle, CaptchaProps>(({ onVerify, className }, ref) => {
    const [captchaText, setCaptchaText] = useState('');
    const [userInput, setUserInput] = useState('');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const generateCaptcha = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptchaText(result);
        setUserInput('');
        onVerify(false);
        drawCaptcha(result);
    };

    const drawCaptcha = (text: string) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear and set background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#f8fafc');
        gradient.addColorStop(1, '#e2e8f0');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add noise lines
        for (let i = 0; i < 5; i++) {
            ctx.strokeStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255}, 0.3)`;
            ctx.beginPath();
            ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.stroke();
        }

        // Add noise dots
        for (let i = 0; i < 30; i++) {
            ctx.fillStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255}, 0.3)`;
            ctx.beginPath();
            ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, Math.PI * 2);
            ctx.fill();
        }

        // Draw text
        ctx.font = 'bold 24px "Outfit", sans-serif';
        ctx.textBaseline = 'middle';

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const x = 15 + i * 22;
            const y = canvas.height / 2 + (Math.random() * 10 - 5);
            const angle = (Math.random() * 40 - 20) * (Math.PI / 180);

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.fillStyle = '#0c7c92';
            ctx.shadowColor = 'rgba(0,0,0,0.1)';
            ctx.shadowBlur = 2;
            ctx.fillText(char, 0, 0);
            ctx.restore();
        }
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    useImperativeHandle(ref, () => ({
        reset: () => generateCaptcha(),
        validate: (input: string) => {
            const isValid = input.toLowerCase() === captchaText.toLowerCase();
            return isValid;
        }
    }));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setUserInput(val);
        onVerify(val.toLowerCase() === captchaText.toLowerCase());
    };

    return (
        <div className={`captcha-container ${className}`}>
            <div className="flex items-center gap-4 mb-3">
                <div className="relative group">
                    <canvas
                        ref={canvasRef}
                        width={150}
                        height={40}
                        className="rounded-xl border border-[var(--border-color)] shadow-sm bg-white"
                        style={{ cursor: 'not-allowed' }}
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl"></div>
                </div>
                <button
                    type="button"
                    onClick={generateCaptcha}
                    className="p-3 text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded-xl transition-all border border-transparent hover:border-[var(--primary)]/20"
                    title="Refresh Captcha"
                >
                    <FiRefreshCw className="w-4 h-4" />
                </button>
            </div>
            <input
                type="text"
                placeholder="Security Code"
                value={userInput}
                onChange={handleInputChange}
                className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm font-bold text-[var(--text-main)] placeholder:text-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--primary)]/50 transition-all uppercase tracking-widest"
                autoComplete="off"
                spellCheck="false"
            />
        </div>
    );
});

export default Captcha;
