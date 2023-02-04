import { ConversationService } from "_/data/usecases/conversation";
import { ConversationUseCase } from "_/domain/usecases/conversation";
import { FirebaseDatabaseRepository, FirebaseRealtimeDatabaseRepository } from "_/infra/repositories";
import { MongoDatabaseRepository } from "_/infra/repositories/mongoDatabaseRepository";
import { FIREBASE_COLLECTION, MONGO_COLLECTION } from "_/presentation/constants";

export const makeConversationService = (): ConversationUseCase => {
    const conversationDatabaseRepository = new FirebaseDatabaseRepository(FIREBASE_COLLECTION.CONVERSATIONS)
    const userDatabaseRepository = new MongoDatabaseRepository(MONGO_COLLECTION.USERS);
    const conversationRealTimeDatabaseRepository = new FirebaseRealtimeDatabaseRepository(FIREBASE_COLLECTION.CONVERSATIONS)

    return new ConversationService(
        conversationDatabaseRepository, 
        userDatabaseRepository, 
        conversationRealTimeDatabaseRepository
    )
}