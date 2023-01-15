import { AuthPromptService } from "_/presentation/hooks";

export const authPromptServiceStub: AuthPromptService = {
    promptAuth: async () => {
        return {
            code: "1234",
            client_id: "client_id",
            client_secret: "client_secret"
        };
    },
};