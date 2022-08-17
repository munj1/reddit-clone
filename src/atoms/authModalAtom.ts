import { atom } from "recoil";

export interface AuthModalState {
  open: boolean;
  view: "login" | "signup" | "resetPassword";
}

const defaultModalState: AuthModalState = {
  open: false,
  view: "login",
};

export const authModalState = atom<AuthModalState>({
  // 이 atom은 AuthModalState라는 타입을 지닐거임 이라고 미리 알려주는거
  key: `authModalState`,
  default: defaultModalState,
});
