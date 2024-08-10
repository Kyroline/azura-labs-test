import { Types } from "mongoose"

export const filterByCategories = (searchedCategory) => [
    {
        $lookup: {
            from: 'bookcategories',
            let: { categories: '$categories', category: [new Types.ObjectId(searchedCategory)] },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $in: ['$_id', '$$categories'] },
                                { $in: ['$_id', '$$category'] }
                                // { $regexMatch: { input: 'title', regex: searchedCategory, options: "i" } }
                            ]
                        }
                    }
                }
            ],
            as: 'matchedCategories'
        }
    },
    {
        $match: {
            matchedCategories: { $ne: [] }
        }
    },
    {
        $project: {
            matchedCategories: 0
        }
    }
]

export const filterBySearch = (searchQuery) => [
    {
        $match: {
            $or: [
                { title: { $regex: searchQuery, $options: "i" } },
                { author: { $regex: searchQuery, $options: "i" } },
                { publisher: { $regex: searchQuery, $options: "i" } }
            ]
        }
    }
]

export const filterByDate = (start, end) => {
    const match = {};

    if (start)
        match['publication_date'] = { ...match['publication_date'], $gte: start };

    if (end)
        match['publication_date'] = { ...match['publication_date'], $lte: end };

    return [
        {
            $match: match
        }
    ]
}

export const sort = (field, direction) => [
    {
        $sort: {
            [field]: direction
        }
    }
]

export const paginate = (lastId, limit) => {
    let pipeline = []
    if (lastId)
        pipeline.push({ $match: { _id: { $gt: new Types.ObjectId(lastId) } } })

    pipeline.push({ $limit: limit })
    return pipeline
}

export const populate = () => [
    {
        $lookup: {
            from: 'bookcategories',
            localField: 'categories',
            foreignField: '_id',
            as: 'categories'
        }
    }
]

export const groupAndCountField = (field, searchQuery) => [
    {
        $group: {
            _id: field,
            count: {
                $count: {}
            }
        }
    },
    {
        $match: {
            _id: { $regex: searchQuery ?? '', $options: "i" }
        }
    }
]