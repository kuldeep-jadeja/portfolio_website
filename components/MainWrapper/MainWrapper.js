import { useTheme } from '@/contexts/ThemeContext';
import styles from './MainWrapper.module.scss';
import { Moon, Sun } from 'lucide-react';
import Dock from '../Dock/Dock';

export default function MainWrapper({ children, defaultActiveIndex = 0 }) {
    const { theme, toggleTheme } = useTheme();
    return (
        <>
            <div className={styles.themeContainer}>
                <button className={styles.themeToggle} onClick={toggleTheme}>
                    {theme === 'light' ? (
                        <Sun size={24} strokeWidth={2} />
                    ) : (
                        <Moon size={24} strokeWidth={2} />
                    )}
                </button >
            </div>
            <main>
                {children}
            </main>
            <Dock defaultActiveIndex={defaultActiveIndex} />
        </>
    );
}