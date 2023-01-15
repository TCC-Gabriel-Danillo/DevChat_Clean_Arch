
import { fireEvent, render } from "@testing-library/react-native";
import { act } from "react-test-renderer";
import { MessagesScreen } from "_/presentation/screens";
import { TEST_ID } from "_/presentation/constants";
import { AuthContext, ConversationContext, MessageContextProvider } from "_/presentation/contexts";
import { MessageServiceStub } from "../../mocks/stubs/messageServiceStub";
import { mockedLoggedUser, mockedConversation } from "../../mocks/models";


const messageServiceStub = new MessageServiceStub()

const mockedUpdateConversation = jest.fn()

const renderComponent = () => {
    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: true,
                isAuthenticating: false,
                loginWithGithub: jest.fn(),
                logout: jest.fn(),
                user: mockedLoggedUser
            }}
        >
            <ConversationContext.Provider
                value={{
                    createNewConversation: jest.fn(),
                    isLoadingConversations: false,
                    updateConversationInfo: mockedUpdateConversation,
                    conversations: [mockedConversation]
                }}
            >
                <MessageContextProvider
                    conversation={mockedConversation}
                    messageService={messageServiceStub}
                >
                    <MessagesScreen />
                </MessageContextProvider>
            </ConversationContext.Provider>

        </AuthContext.Provider>
    )
}


describe("Message Screen", () => {
    it("Should list messages as mark messages as read", async () => {
        const { findAllByTestId } = render(renderComponent())
        const messagesBallons = await findAllByTestId(TEST_ID.MESSAGE_BALLON)
        expect(messagesBallons.length).toBe(3)
    })

    it("Should send a new message", async () => {
        const spy = jest.spyOn(messageServiceStub, "sendMessage")
        const { findByTestId } = render(renderComponent())
        const sendButtom = await findByTestId(TEST_ID.SEND_BUTTON)

        await act(() => {
            fireEvent.press(sendButtom)
        })

        expect(spy).toBeCalled()

    })
})