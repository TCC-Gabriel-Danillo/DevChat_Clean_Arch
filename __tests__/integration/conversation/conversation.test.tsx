

import { render, fireEvent } from "@testing-library/react-native";

import { act } from "react-test-renderer";
import { ConversationServiceStub } from "../../mocks/stubs";
import {
    mockedConversation,
    mockedLoggedUser,
    mockedParticipant
} from "../../mocks/models";
import { AuthContext, ConversationContextProvider } from "_/presentation/contexts";
import { HomeScreen } from "_/presentation/screens";
import { MAIN_SCREENS, TEST_ID } from "_/presentation/constants";

const mockedNavigate = jest.fn()
jest.mock('_/presentation/hooks/useMainNavigation', () => ({
    useMainNavigation: () => ({
        navigate: mockedNavigate
    })
}));

const conversationServiceStub = new ConversationServiceStub()
const renderComponent = () => {
    return (
        <AuthContext.Provider value={{
            isAuthenticated: true,
            isAuthenticating: false,
            loginWithGithub: jest.fn(),
            logout: jest.fn(),
            user: mockedLoggedUser
        }}>
            <ConversationContextProvider conversationService={conversationServiceStub}>
                <HomeScreen />
            </ConversationContextProvider>
        </AuthContext.Provider>
    )
}

describe("HomeScreen", () => {
    it("should redender a conversation card", async () => {
        const { findByText } = render(
            renderComponent()
        );

        const userCard = await findByText("any_username2");

        expect(userCard).toBeTruthy()
    })

    it("should navigate to message screen", async () => {
        const { findByText } = render(
            renderComponent()
        );

        const userCard = await findByText("any_username2");

        await act(() => {
            fireEvent.press(userCard)
        });

        expect(mockedNavigate).toHaveBeenCalledWith(MAIN_SCREENS.MESSAGE_SCREEN, {
            conversation: mockedConversation,
            participant: mockedParticipant
        })

    })

    it("Should try to navigate to tech screen", async () => {
        const { findByTestId } = render(
            renderComponent()
        );

        const addButton = await findByTestId(TEST_ID.ADD_BUTTON);
        await act(() => {
            fireEvent.press(addButton)
        });

        expect(mockedNavigate).toHaveBeenCalledWith(MAIN_SCREENS.TECH_SCREEN)
    })
})