import { useTheme } from '@/contexts/ThemeContext';
import styles from './MainWrapper.module.scss';
import { Moon, Sun } from 'lucide-react';
import Dock from '../Dock/Dock';
import ScrollProgress from '../Effects/ScrollProgress';
import Cursor from '../Effects/Cursor';

export default function MainWrapper({ children, defaultActiveIndex = 0 }) {
    const { theme, toggleTheme } = useTheme();
    return (
        <>
            <ScrollProgress />
            <Cursor />
            <div className={styles.themeContainer}>
                <button type='button' aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} className={styles.themeToggle} onClick={toggleTheme}>
                    <span key={theme} className={styles.themeIcon}>
                        {theme === 'light' ? (
                            <Sun size={20} strokeWidth={2} />
                        ) : (
                            <Moon size={20} strokeWidth={2} />
                        )}
                    </span>
                </button >
            </div>
            <main>
                {children}
            </main>
            <Dock defaultActiveIndex={defaultActiveIndex} />
        </>
    );
}
