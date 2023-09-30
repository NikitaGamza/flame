import Link from 'next/link';
import style from './Header.module.scss';
export default function Header() {
  return (
    <div className={style.header}>
      <nav className={style.header__nav}>
        <Link className={style.header__nav__link} href={'/'}>
          Главная
        </Link>
        <Link className={style.header__nav__link} href={'/people'}>
          Персонажи
        </Link>
        <Link className={style.header__nav__link} href={'/favorites'}>
          Избранное
        </Link>
      </nav>
    </div>
  );
}
