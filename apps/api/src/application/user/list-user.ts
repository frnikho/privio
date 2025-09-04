import {User} from "@entity/user.entity";
import {Pagination} from "@api/utils/request";
import {ResultAsync} from "neverthrow";
import userRepo from "@repo/user.repo";
import {db} from "@service/db.service";

type Input = {
    pagination: Pagination;
}

type Output = {
    users: User[];
    total: number;
}

export default ({pagination}: Input): ResultAsync<Output, Error> => {
    return userRepo(db).list(pagination.page, pagination.limit);
}