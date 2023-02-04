import { MessageService } from "_/data/usecases/message";
import { Conversation } from "_/domain/models";
import { MessageUseCase } from "_/domain/usecases/message";
import { FirebaseDatabaseRepository, FirebaseRealtimeDatabaseRepository } from "_/infra/repositories";
import { MongoDatabaseRepository } from "_/infra/repositories/mongoDatabaseRepository";
import { FIREBASE_COLLECTION, MONGO_COLLECTION } from "_/presentation/constants";

export const makeMessageService = (conversation: Conversation): MessageUseCase => {
    const messageDatabaseRepository = new FirebaseDatabaseRepository(
        FIREBASE_COLLECTION.CONVERSATIONS,
        conversation.id,
        FIREBASE_COLLECTION.MESSAGES
    )
    const messageRealtimeDatabaseRepository = new FirebaseRealtimeDatabaseRepository(
        FIREBASE_COLLECTION.CONVERSATIONS,
        conversation.id,
        FIREBASE_COLLECTION.MESSAGES
    )
    const userDatabaseRepository = new MongoDatabaseRepository(MONGO_COLLECTION.USERS);

    return new MessageService(
        messageDatabaseRepository,
        messageRealtimeDatabaseRepository,
        userDatabaseRepository
    )
}