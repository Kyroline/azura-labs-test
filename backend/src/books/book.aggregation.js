export const filterByCategories = (searchedCategory) => [
    {
        $lookup: {
            from: 'bookcategories',
            let: { categories: '$categories' },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $in: ['$_id', '$$categories'] },
                                { $regexMatch: { input: 'title', regex: searchedCategory, $options: "i" } }
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

export const filterByDate = (start, end) => [
    {
        $match: {
            publication_date: {
                $gte: start,
                $lte: end
            }
        }
    }
]