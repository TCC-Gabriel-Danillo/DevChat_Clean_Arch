import React from 'react';
import { render, fireEvent } from "@testing-library/react-native";
import { act } from 'react-test-renderer';
import { LocalStorage } from '_/data/protocols/cache/localStorage';
import { AuthUseCase } from '_/domain/usecases/authentication';
import { AlertContextProvider, AuthContextProvider } from '_/presentation/contexts';
import { authPromptServiceStub, AuthServiceStub, LocalStorageRepositoryStub } from '../../mocks/stubs';
import { AuthScreen } from '_/presentation/screens';



const renderComponent = (
  localStorageStub: LocalStorage,
  authServiceStub: AuthUseCase
) => {
  return (
    <AlertContextProvider>
      <AuthContextProvider
        authPromptService={authPromptServiceStub}
        authService={authServiceStub}
        localStorageRepository={localStorageStub}
      >
        <AuthScreen />
      </AuthContextProvider>
    </AlertContextProvider>
  );
};

jest.setTimeout(70000)

describe("Authentication", () => {
  it("Should call authentication method with the right parameters", async () => {
    const localStorageStub = new LocalStorageRepositoryStub();
    const authServiceStub = new AuthServiceStub();
    const { findByText } = render(
      renderComponent(localStorageStub, authServiceStub)
    );

    const button = await findByText("Entrar com Github");
    const spy = jest.spyOn(authServiceStub, "authenticateGithub")

    await act(async () => {
      fireEvent.press(button);
    });
    expect(spy).toBeCalledWith({
      code: "1234",
      client_id: "client_id",
      client_secret: "client_secret"
    })
  });

  it("Should not login if authenticate with git returns undefined", async () => {
    const localStorageStub = new LocalStorageRepositoryStub();
    const authServiceStub = new AuthServiceStub();

    jest
      .spyOn(authServiceStub, "authenticateGithub")
      .mockImplementation(() => Promise.resolve(undefined));
    const { findByText } = render(
      renderComponent(localStorageStub, authServiceStub)
    );

    // login
    const button = await findByText("Entrar com Github");
    await act(async () => {
      fireEvent.press(button);
    })

    expect(await findByText("Erro ao logar com o git.")).toBeTruthy()
  });

  it("Should not login if authenticate with git throws an error", async () => {
    const localStorageStub = new LocalStorageRepositoryStub();
    const authServiceStub = new AuthServiceStub();

    jest
      .spyOn(authServiceStub, "authenticateGithub")
      .mockImplementation(() => Promise.reject(new Error("some error")));
    const { findByText } = render(
      renderComponent(localStorageStub, authServiceStub)
    );

    // login
    const button = await findByText("Entrar com Github");
    await act(async () => {
      fireEvent.press(button);
    })
    expect(await findByText("Erro ao logar com o git.")).toBeTruthy()
  });
});