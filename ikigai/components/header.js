import Link from "next/link";
import styles from "@/app/styles/page.module.css"

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headercontainer}>
                <Link href="/" > Home </Link>
                <Link href= "/createaccount"> Create An Account </Link>
                <Link href= "/login"> Login </Link>
                <Link href= "/monthlylist"> Create Your Monthly List! </Link>
                <Link href= "/recipes"> Search for Recipes </Link>
                <Link href= "/"> Logout </Link>
            </div>
        </header>
    )
}