import { ConversationService } from "_/data/usecases/conversation";
import { ConversationUseCase } from "_/domain/usecases/conversation";
import { FirebaseDatabaseRepository, FirebaseRealtimeDatabaseRepository } from "_/infra/repositories";
import { FIREBASE_COLLECTION } from "_/presentation/constants";

export const makeConversationService = (): ConversationUseCase => {
    const conversationDatabaseRepository = new FirebaseDatabaseRepository(FIREBASE_COLLECTION.CONVERSATIONS)
    const userDatabaseRepository = new FirebaseDatabaseRepository(FIREBASE_COLLECTION.USERS)
    const conversationRealTimeDatabaseRepository = new FirebaseRealtimeDatabaseRepository(FIREBASE_COLLECTION.CONVERSATIONS)

    return new ConversationService(
        conversationDatabaseRepository, 
        userDatabaseRepository, 
        conversationRealTimeDatabaseRepository
    )
}