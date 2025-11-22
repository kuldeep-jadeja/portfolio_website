import { useTheme } from '@/contexts/ThemeContext';
import styles from './MainWrapper.module.scss';
import { Moon, Sun } from 'lucide-react';

export default function MainWrapper() {
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
        </>
    );
}