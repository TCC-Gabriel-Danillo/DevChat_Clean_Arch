import { fireEvent, render } from "@testing-library/react-native";

import { act } from "react-test-renderer";
import { MAIN_SCREENS, TEST_ID } from "_/presentation/constants";
import { AuthContext } from "_/presentation/contexts";
import { TechScreen } from "_/presentation/screens";
import { mockedLoggedUser } from "../../mocks/models";

const mockedNavigate = jest.fn()
jest.mock('_/presentation/hooks/useMainNavigation', () => ({
    useMainNavigation: () => ({
        navigate: mockedNavigate
    })
}));


const renderComponent = () => {
    return (
        <AuthContext.Provider value={{
            isAuthenticated: true,
            isAuthenticating: false,
            loginWithGithub: jest.fn(),
            logout: jest.fn(),
            user: mockedLoggedUser
        }}>
            <TechScreen />
        </AuthContext.Provider>
    )
}

describe("Techs Screen", () => {
    it("should render cards with techs", async () => {
        const { findAllByTestId } = render(renderComponent())
        const cards = await findAllByTestId(TEST_ID.TECH_CARD)
        expect(cards.length).toBe(2)
    })
    it("should navigate to the users screen", async () => {
        const { findByText } = render(renderComponent())
        const card = await findByText("tech_1")

        await act(() => {
            fireEvent.press(card)
        })

        expect(mockedNavigate).toHaveBeenCalledWith(MAIN_SCREENS.USERS_SCREEN, {
            tech: "tech_1"
        })

    })
})