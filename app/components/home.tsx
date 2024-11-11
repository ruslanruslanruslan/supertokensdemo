import { cookies } from "next/headers";
import { TryRefreshComponent } from "./tryRefreshClientComponent";
import styles from "../page.module.css";
import { redirect } from "next/navigation";
import Image from "next/image";
import { CelebrateIcon, SeparatorLine } from "../../assets/images";
import { CallAPIButton } from "./callApiButton";
import { LinksComponent } from "./linksComponent";
import { SessionAuthForNextJS } from "./sessionAuthForNextJS";

export async function HomePage() {
    const cookiesFromReq = await cookies();
    const cookiesArray: Array<{ name: string; value: string }> = Array.from(cookiesFromReq.getAll()).map(
        ({ name, value }) => ({
            name,
            value,
        })
    );

    /**
     * SessionAuthForNextJS will handle proper redirection for the user based on the different session states.
     * It will redirect to the login page if the session does not exist etc.
     */
    return (
        <SessionAuthForNextJS>
            <div className={styles.homeContainer}>
                <div className={styles.mainContainer}>
                    <div className={`${styles.topBand} ${styles.successTitle} ${styles.bold500}`}>
                        <Image src={CelebrateIcon} alt="Login successful" className={styles.successIcon} /> Login
                        successful
                    </div>
                    <div className={styles.innerContent}>
                        <div>Your userID is:</div>
                        <div className={`${styles.truncate} ${styles.userId}`}>Not able to get from SSR</div>
                        <CallAPIButton />
                    </div>
                </div>
                <LinksComponent />
                <Image className={styles.separatorLine} src={SeparatorLine} alt="separator" />
            </div>
        </SessionAuthForNextJS>
    );
}
