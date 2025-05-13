import {
    signInWithEmailAndPassword,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    createUserWithEmailAndPassword
} from "firebase/auth"
import { auth } from "@/firebase"
import { showToast } from "@/notification"

export async function signInEmailAndPassword(email: string, password: string) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        showToast("login_success")
        return user
    } catch (error: any) {
        switch (error.code) {
            case "auth/user-not-found":
                showToast("user_not_found")
                break
            case "auth/wrong-password":
                showToast("wrong_password")
                break
            case "auth/invalid-email":
                showToast("invalid_email")
                break
            default:
                showToast("login_failed")
                break
        }
        throw error
    }
}

export async function signInWithGooglePopup() {
    const provider = new GoogleAuthProvider()
    try {
        const userCredential = await signInWithPopup(auth, provider)
        const user = userCredential.user
        showToast("login_success")
        return user
    } catch (error: any) {
        showToast("login_failed")
        throw error
    }
}
export async function signInWithGoogleRedirect() {
    const provider = new GoogleAuthProvider()
    try {
        await signInWithRedirect(auth, provider)
    } catch (error: any) {
        showToast("login_failed")
        throw error
    }
}
export async function logOut() {
    try {
        await signOut(auth)
        showToast("logout_success")
    } catch (error: any) {
        showToast("logout_failed")
        throw error
    }
}
export async function signUp(email: string, password: string) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        showToast("sign_up_success")
        return user
    } catch (error: any) {
        switch (error.code) {
            case "auth/email-already-in-use":
                showToast("email_already_in_use")
                break
            case "auth/invalid-email":
                showToast("invalid_email")
                break
            case "auth/weak-password":
                showToast("weak_password")
                break
            default:
                showToast("sign_up_failed")
                break
        }
        throw error
    }
}