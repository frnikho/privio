import { Avatar } from "@chakra-ui/react";
import type {Review} from "@privio/types/game";
import {FaStar} from "react-icons/fa";

type Props = {
    review: Review;
}

export default function Review({review}: Props) {

    return (
        <div>
            <div className={'flex flex-row gap-4 items-center'}>
                <Avatar.Root className={'w-12'} size={'xl'}>
                    <Avatar.Fallback name={`${review.user.firstname} ${review.user.lastname}`} />
                </Avatar.Root>
                <p className={'text-lg font-semibold'}>
                    {`${review.user.firstname} ${review.user.lastname}`}
                </p>
                <div className={'flex flex-row gap-0.5'}>
                    {[...Array(review.review.rating ?? 0).keys()].map(() => (
                        <FaStar className={'w-3'} color={'yellow'}/>
                    ))}
                </div>
            </div>
            <div className={'flex flex-row gap-4'}>
                <div className={'w-12'}></div>
                <div>
                    {review.review.notes}
                </div>
            </div>
        </div>
    )

}