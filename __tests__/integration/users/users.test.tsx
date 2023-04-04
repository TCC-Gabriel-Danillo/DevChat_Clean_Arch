import { fireEvent, render } from "@testing-library/react-native";

import { act } from "react-test-renderer";
import { MAIN_SCREENS, TEST_ID } from "_/presentation/constants";
import { AuthContext, ConversationContextProvider, UsersContextProvider } from "_/presentation/contexts";
import { UsersScreen } from "_/presentation/screens";
import { mockedConversation, mockedLoggedUser, mockedParticipant } from "../../mocks/models";
import { ConversationServiceStub, UserServiceStub } from "../../mocks/stubs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const client = new QueryClient()

const mockedNavigate = jest.fn()
jest.mock('_/presentation/hooks/useMainNavigation', () => ({
    useMainNavigation: () => ({
        navigate: mockedNavigate
    })
}));

jest.mock('_/presentation/hooks/useMainRoute', () => ({
    useMainRoute: () => ({
        params: {
            tech: "any_tech"
        }
    })
}));


jest.setTimeout(70000)

const conversationServiceStub = new ConversationServiceStub()
const userServiceStub = new UserServiceStub()

const renderComponent = () => {
    return (
        <QueryClientProvider client={client}>
            <AuthContext.Provider value={{
                isAuthenticated: true,
                isAuthenticating: false,
                loginWithGithub: jest.fn(),
                logout: jest.fn(),
                user: mockedLoggedUser
            }}>
                <ConversationContextProvider
                    conversationService={conversationServiceStub}
                >
                    <UsersContextProvider
                        usersService={userServiceStub}
                        tech="any_tech"
                    >
                        <UsersScreen />
                    </UsersContextProvider>

                </ConversationContextProvider>
            </AuthContext.Provider>
        </QueryClientProvider>
    )
}




describe("Users Screen", () => {

    it("should list users", async () => {
        const { findAllByTestId } = render(renderComponent())
        const userCards = await findAllByTestId(TEST_ID.USER_CARD)
        expect(userCards.length).toBe(1)
    })

    it("should render empty message when there's no users", async () => {
        jest.spyOn(userServiceStub, "listUsersByTech").mockReturnValueOnce(Promise.resolve([]))
        const { findByTestId } = render(renderComponent())
        const emptyMessage = await findByTestId(TEST_ID.EMPTY_MESSAGE)
        expect(emptyMessage).toBeTruthy()
    })

    it("should navigate to the message screen", async () => {
        const { findByText } = render(renderComponent())
        const userCard = await findByText("any_username2")

        await act(() => {
            fireEvent.press(userCard)
        })

        expect(mockedNavigate).toHaveBeenCalledWith(MAIN_SCREENS.MESSAGE_SCREEN, {
            conversation: mockedConversation,
            participant: mockedParticipant
        })
    })

    it("should create a new conversation", async () => {
        jest.spyOn(conversationServiceStub, "listenConversationsByUserId").mockImplementation((userId, cb) => cb([]))
        const spy = jest.spyOn(conversationServiceStub, "createConversation");

        const { findByText } = render(renderComponent())
        const userCard = await findByText("any_username2")

        await act(() => {
            fireEvent.press(userCard)
        })
        expect(spy).toHaveBeenCalled()
    })
})