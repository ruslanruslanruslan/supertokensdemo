import EmailPasswordReact from "supertokens-auth-react/recipe/emailpassword";
import ThirdPartyReact from "supertokens-auth-react/recipe/thirdparty";
import PasswordlessReact from "supertokens-auth-react/recipe/passwordless";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import Session from "supertokens-auth-react/recipe/session";
import { useRouter } from "next/navigation";
import { SuperTokensConfig } from "supertokens-auth-react/lib/build/types";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { PasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/passwordless/prebuiltui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import {EmailVerificationPreBuiltUI} from "supertokens-auth-react/recipe/emailverification/prebuiltui";

const routerInfo: { router?: ReturnType<typeof useRouter>; pathName?: string } = {};

export function setRouter(router: ReturnType<typeof useRouter>, pathName: string) {
    routerInfo.router = router;
    routerInfo.pathName = pathName;
}

export const frontendConfig = (): SuperTokensConfig => {
    return {
        appInfo : {
            appName: "docway",
            apiDomain: `${process.env.NEXT_PUBLIC_AUTH_URL}`,
            websiteDomain: `${process.env.NEXT_PUBLIC_APP_URL}`,
            apiBasePath: "/api/auth",
            websiteBasePath: "/auth"},
        recipeList: [
            EmailVerification.init({mode: "REQUIRED"}),
            EmailPasswordReact.init(),
            ThirdPartyReact.init({
                signInAndUpFeature: {
                    providers: [
                        ThirdPartyReact.Google.init(),
                        ThirdPartyReact.Discord.init(),
                        ThirdPartyReact.Facebook.init()
                    ],
                },
            }),
            PasswordlessReact.init({
                contactMethod: "EMAIL_OR_PHONE",
            }),
            Session.init({sessionTokenBackendDomain: ".ibragimov.pw"}),
        ],
        windowHandler: (orig) => {
            return {
                ...orig,
                location: {
                    ...orig.location,
                    getPathName: () => routerInfo.pathName!,
                    assign: (url) => routerInfo.router!.push(url.toString()),
                    setHref: (url) => routerInfo.router!.push(url.toString()),
                },
            };
        },
    };
};

export const recipeDetails = {
    docsLink: "https://supertokens.com/docs/thirdpartypasswordless/introduction",
};

export const PreBuiltUIList = [EmailVerificationPreBuiltUI, EmailPasswordPreBuiltUI, ThirdPartyPreBuiltUI, PasswordlessPreBuiltUI];
