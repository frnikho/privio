import {ResultAsync} from "neverthrow";
import {AppException} from "@exceptions/app.exception";
import gameRepo from "@repo/game.repo";
import {db} from "@service/db.service";
import { match } from "ts-pattern";

type Input = {
    sort: 'latest' | 'rated' | 'search' | 'list';
    title?: string;
    page: number;
    limit: number;
}

type Output = {

}

export default ({sort, page, limit, title}: Input): ResultAsync<Output, AppException> => {
    const gameInterface = gameRepo(db);
    return match(sort)
        .with('list', () => gameInterface.list(page, limit))
        .with('latest', () => gameInterface.findLatest())
        .with('rated', () => gameInterface.findMostRated())
        .with('search', () => gameInterface.search(title ?? '', page, limit))
        .exhaustive();
}