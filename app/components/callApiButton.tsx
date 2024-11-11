"use client";

import styles from "../page.module.css";

import { appInfo } from "../config/appInfo";
import Session from "supertokens-auth-react/recipe/session";

export const CallAPIButton = () => {
    const fetchUserData = async () => {
        const userInfoResponse = await Session.getUserId();

        alert(await userInfoResponse);
    };

    return (
        <div onClick={fetchUserData} className={styles.sessionButton}>
            Call SDK
        </div>
    );
};
