export const settingsCategoryDataMock = {trivia_categories:[
    {
        "id": 9,
        "name": "General Knowledge"
    },
    {
        "id": 10,
        "name": "Entertainment: Books"
    },
    {
        "id": 11,
        "name": "Entertainment: Film"
    },
    {
        "id": 12,
        "name": "Entertainment: Music"
    },
    {
        "id": 13,
        "name": "Entertainment: Musicals & Theatres"
    },
    {
        "id": 14,
        "name": "Entertainment: Television"
    },
    {
        "id": 15,
        "name": "Entertainment: Video Games"
    },
    {
        "id": 16,
        "name": "Entertainment: Board Games"
    },
    {
        "id": 17,
        "name": "Science & Nature"
    },
    {
        "id": 18,
        "name": "Science: Computers"
    },
    {
        "id": 19,
        "name": "Science: Mathematics"
    },
    {
        "id": 20,
        "name": "Mythology"
    },
    {
        "id": 21,
        "name": "Sports"
    },
    {
        "id": 22,
        "name": "Geography"
    },
    {
        "id": 23,
        "name": "History"
    },
    {
        "id": 24,
        "name": "Politics"
    },
    {
        "id": 25,
        "name": "Art"
    },
    {
        "id": 26,
        "name": "Celebrities"
    },
    {
        "id": 27,
        "name": "Animals"
    },
    {
        "id": 28,
        "name": "Vehicles"
    },
    {
        "id": 29,
        "name": "Entertainment: Comics"
    },
    {
        "id": 30,
        "name": "Science: Gadgets"
    },
    {
        "id": 31,
        "name": "Entertainment: Japanese Anime & Manga"
    },
    {
        "id": 32,
        "name": "Entertainment: Cartoon & Animations"
    }
]}


export const quizData = {
    "data": {
        "response_code": 0,
        "results": [
            {
                "category": "Mythology",
                "type": "multiple",
                "difficulty": "hard",
                "question": "Talos, the mythical giant bronze man, was the protector of which island?",
                "correct_answer": "Crete",
                "incorrect_answers": [
                    "Sardinia",
                    "Sicily",
                    "Cyprus"
                ],
                "id": 0
            },
            {
                "category": "General Knowledge",
                "type": "boolean",
                "difficulty": "medium",
                "question": "Coca-Cola&#039;s original colour was green.",
                "correct_answer": "False",
                "incorrect_answers": [
                    "True"
                ],
                "id": 1
            },
            {
                "category": "Geography",
                "type": "multiple",
                "difficulty": "easy",
                "question": "How many federal states does Germany have?",
                "correct_answer": "16",
                "incorrect_answers": [
                    "13",
                    "32",
                    "25"
                ],
                "id": 2
            },
            {
                "category": "Science: Computers",
                "type": "multiple",
                "difficulty": "medium",
                "question": "The computer OEM manufacturer Clevo, known for its Sager notebook line, is based in which country?",
                "correct_answer": "Taiwan",
                "incorrect_answers": [
                    "United States",
                    "Germany",
                    "China (People&#039;s Republic of)"
                ],
                "id": 3
            },
        ]
    },
    "status": 200,
    "statusText": "",
    "headers": {
        "cache-control": "no-store, no-cache, must-revalidate",
        "content-type": "application/json",
        "expires": "Thu, 19 Nov 1981 08:52:00 GMT",
        "pragma": "no-cache"
    },
    "config": {
        "transitional": {
            "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
        },
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "headers": {
            "Accept": "application/json, text/plain, */*"
        },
        "baseURL": "https://opentdb.com/",
        "method": "get",
        "url": "https://opentdb.com/api.php?amount=50"
    },
    "request": {}
}
