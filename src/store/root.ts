import { defineStore } from "pinia";
import { reactive } from "vue";

interface IRootNotification {
  type: "error" | "success";
  message: string;
}

interface IRootState {
  notifications: Map<string, IRootNotification>;
}

export const useRootStore = defineStore("root", () => {
  const state = reactive<IRootState>({
    notifications: new Map(),
  });

  const setNotification = (message: string, error?: Error | unknown) => {
    if (error) {
      state.notifications.set(state.notifications.size.toString(), {
        type: "error",
        message,
      });
      throw error;
    } else {
      state.notifications.set(state.notifications.size.toString(), {
        type: "success",
        message,
      });
    }
  };

  const removeNotification = async (id: string) => {
    state.notifications.delete(id);
  };

  return { state, setNotification, removeNotification };
});
