import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async(configService: ConfigService) => {
                console.log(configService.get<string>('MONGO_URL'))
                return {
                    uri: configService.get<string>('MONGO_URL'),
                }
            },
            inject: [ConfigService]
        }),
    ],
})

export class MongoModule {};