import mongoose,{Document,Model,Schema} from "mongoose"

interface Icomment extends Document{
    user:object,
    comment:string,
}

interface IReview extends Document{
    user:object,
    rating:number,
    comment:string,
    commentReplies:Icomment[];
}

interface Ilink extends Document{
title:string;
url:string;
}

interface ICourseData extends Document{
    title:string;
    description:string,
    videoUrl:string,
    videoThumbnail:object;
    videoSection:string;
    videoLength:number;
    videoPlayer:string;
    links:Ilink[];
    suggestions:string;
    questions:Icomment[];
}

interface ICourse extends Document{
    name:string;
    description:string;
    price:number;
    estimatedPrice?:number;
    thumbnail:object;
    tags:string;
    level:string;
    demoUrl:string;
    benefits:{title:string}[];
    prerequisites:{title:string};
    reviews:IReview[];
    courseData:ICourseData[];
    ratings?:number;
    purchased?:number;
}

