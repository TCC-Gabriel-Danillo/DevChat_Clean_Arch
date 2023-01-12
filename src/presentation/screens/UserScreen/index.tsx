import { Text, Loading, Empty, UserCard, Container } from "_/presentation/components"
import {  MAIN_SCREENS, TEST_ID } from "_/presentation/constants";
import { useEffect } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { parseArrayToString } from "_/presentation/utils";
import styles from "./styles"
import { Conversation, User } from "_/domain/models";
import { useAuth, useConversation, useMainNavigation, useMainRoute, useUsers } from "_/presentation/hooks";

export function UsersScreen() {
    const { users, getUsersByTech, isLoadingUsers } = useUsers()
    const { params } = useMainRoute<MAIN_SCREENS.USERS_SCREEN>()
    const navigation = useMainNavigation()
    const { conversations, createNewConversation } = useConversation()
    const { user: authenticatedUsed } = useAuth()

    useEffect(() => {
        getUsersByTech(params.tech)
    }, [])


    const renderUserList = () => {
        return (
            <FlatList
                data={users}
                renderItem={({ item: user }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => onUserPressed(user)}
                            testID={TEST_ID.USER_CARD}
                        >
                            <UserCard
                                style={styles.userCard}
                                photoUrl={user.photoUrl}
                                title={user.username}
                                subtile={parseArrayToString(user.techs, { limit: 5, separator: ", " })}
                            />
                        </TouchableOpacity>
                    )
                }}
            />
        )
    }


    const onUserPressed = async (user: User) => {

        if (!authenticatedUsed) return

        const conversationExists = checkIfConversationExists(user)
        if (conversationExists) {
            goToMessageScreen(conversationExists, user);
            return
        }

        const participants = [authenticatedUsed, user]
        const newConversation = await createNewConversation(participants, params.tech)
        goToMessageScreen(newConversation, user);
    }

    const checkIfConversationExists = (user: User) => {
        return conversations?.filter(conversation => {
            return conversation.tech === params.tech && conversation.users.map(_user => _user.id).includes(user.id)
        })[0]
    }


    const goToMessageScreen = (conversation: Conversation, participant: User) => {
        navigation.navigate(MAIN_SCREENS.MESSAGE_SCREEN, {
            conversation,
            participant
        })
    }


    if (isLoadingUsers) return <Loading />



    return (
        <Container>
            <Text>
                Usuários interessados na tecnologia <Text fontWeight="bold" >{params.tech}:</Text>
            </Text>
            {users.length ?
                renderUserList() :
                <Empty message="Não há usuários interessados nessa tecnologia." />
            }
        </Container>
    )
}

