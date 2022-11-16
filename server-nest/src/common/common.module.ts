import { Module } from "@nestjs/common";
import { GraphQlModule } from "./graphql.module";
import {MongoModule} from './mongo.modules';
import { ConfigModule } from "../config/config.module";


@Module({
    imports: [GraphQlModule, MongoModule, ConfigModule],
    exports: [GraphQlModule, MongoModule, ConfigModule]
})

export class CommonModule {}