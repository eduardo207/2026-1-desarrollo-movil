import { useEffect, useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (name: string, studentKey: string) => Promise<void>;
}

export default function StudentRegisterDialog({
  isOpen,
  onClose,
  onRegister,
}: Props) {
  const [name, setName] = useState('');
  const [studentKey, setStudentKey] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await onRegister(name.trim(), studentKey.trim());
      setName('');
      setStudentKey('');
      onClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al registrar. Verifica tu conexión.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-end sm:items-center justify-center z-50 px-0 sm:px-4"
      role="presentation"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        background: 'rgba(0, 0, 0, 0.35)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-dialog-title"
        className="w-full sm:max-w-sm"
        style={{
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '20px 20px 0 0',
          padding: '32px 24px 40px',
          boxShadow: '0 -4px 40px rgba(0, 0, 0, 0.15)',
        }}
      >
        {/* Sheet handle on mobile */}
        <div
          className="mx-auto mb-6 sm:hidden"
          style={{
            width: '36px',
            height: '4px',
            borderRadius: '2px',
            background: 'rgba(0, 0, 0, 0.18)',
          }}
        />

        <div className="flex items-center justify-between mb-6">
          <h2
            id="register-dialog-title"
            style={{ fontSize: '20px', fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.02em' }}
          >
            Registrar estudiante
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar diálogo"
            className="flex items-center justify-center transition-all duration-200"
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(0, 0, 0, 0.06)',
              color: '#6e6e73',
              fontSize: '16px',
              cursor: 'pointer',
              lineHeight: 1,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.1)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.06)'; }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="register-name"
              style={{ fontSize: '13px', fontWeight: 500, color: '#1d1d1f' }}
            >
              Nombre
            </label>
            <input
              id="register-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingresa el nombre"
              className="apple-input w-full transition-all duration-200"
              style={{
                borderRadius: '8px',
                border: '1px solid rgba(0, 0, 0, 0.15)',
                padding: '10px 12px',
                fontSize: '15px',
                color: '#1d1d1f',
                background: '#ffffff',
              }}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="register-student-key"
              style={{ fontSize: '13px', fontWeight: 500, color: '#1d1d1f' }}
            >
              Matrícula
            </label>
            <input
              id="register-student-key"
              type="text"
              value={studentKey}
              onChange={(e) => setStudentKey(e.target.value)}
              placeholder="Ingresa la matrícula"
              className="apple-input w-full transition-all duration-200"
              style={{
                borderRadius: '8px',
                border: '1px solid rgba(0, 0, 0, 0.15)',
                padding: '10px 12px',
                fontSize: '15px',
                color: '#1d1d1f',
                background: '#ffffff',
              }}
              required
            />
          </div>

          {error && (
            <p
              role="alert"
              style={{
                fontSize: '13px',
                color: '#ff3b30',
                background: 'rgba(255, 59, 48, 0.08)',
                borderRadius: '8px',
                padding: '10px 12px',
                margin: 0,
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full transition-all duration-200"
            style={{
              background: isSubmitting ? '#a0c4f1' : '#0071e3',
              color: '#ffffff',
              borderRadius: '980px',
              padding: '12px 24px',
              fontSize: '15px',
              fontWeight: 500,
              border: 'none',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              letterSpacing: '-0.01em',
              marginTop: '8px',
            }}
            onMouseEnter={e => { if (!isSubmitting) (e.currentTarget as HTMLButtonElement).style.background = '#0077ed'; }}
            onMouseLeave={e => { if (!isSubmitting) (e.currentTarget as HTMLButtonElement).style.background = '#0071e3'; }}
            onMouseDown={e => { if (!isSubmitting) (e.currentTarget as HTMLButtonElement).style.background = '#006bce'; }}
            onMouseUp={e => { if (!isSubmitting) (e.currentTarget as HTMLButtonElement).style.background = '#0077ed'; }}
          >
            {isSubmitting ? 'Registrando…' : 'Registrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
