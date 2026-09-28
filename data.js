// ============================================
// SYNTHESIS LEARNING APP - DATA FILE
// Complete book library with lessons
// ============================================

const APP_DATA = {
  "user": {
    "name": "Kandy",
    "streak": 0,
    "booksCompleted": 0,
    "totalLearningTime": 0,
    "currentGoal": "Complete 2 books per week",
    "lastActiveDate": null,
    "xp": 0,
    "level": 1,
    "xpToNextLevel": 100,
    "totalXpEarned": 0,
    "xpRewards": {
      "lessonComplete": 25,
      "quizPerfect": 50,
      "quizPass": 20,
      "dailyChallengeComplete": 75,
      "streakBonus": 10,
      "bookComplete": 200,
      "badgeUnlock": 100,
      "flashcardReview": 5,
      "firstLessonOfDay": 15
    },
    "levelTitles": [
      {
        "level": 1,
        "title": "Curious Beginner",
        "icon": "🌱"
      },
      {
        "level": 5,
        "title": "Dedicated Learner",
        "icon": "📖"
      },
      {
        "level": 10,
        "title": "Knowledge Seeker",
        "icon": "🔍"
      },
      {
        "level": 15,
        "title": "Wisdom Hunter",
        "icon": "🎯"
      },
      {
        "level": 20,
        "title": "Scholar",
        "icon": "🎓"
      },
      {
        "level": 25,
        "title": "Expert",
        "icon": "💡"
      },
      {
        "level": 30,
        "title": "Master",
        "icon": "🏆"
      },
      {
        "level": 40,
        "title": "Sage",
        "icon": "🧙"
      },
      {
        "level": 50,
        "title": "Enlightened One",
        "icon": "✨"
      },
      {
        "level": 75,
        "title": "Grand Master",
        "icon": "👑"
      },
      {
        "level": 100,
        "title": "Legendary Scholar",
        "icon": "🌟"
      }
    ],
    "dailyChallenges": {
      "currentDate": null,
      "challenges": [],
      "completedToday": [],
      "totalChallengesCompleted": 0,
      "currentChallengeStreak": 0,
      "longestChallengeStreak": 0
    },
    "challengeTemplates": [
      {
        "id": "lessons_2",
        "type": "lessons",
        "target": 2,
        "description": "Complete 2 lessons today",
        "xp": 75,
        "icon": "📖"
      },
      {
        "id": "lessons_3",
        "type": "lessons",
        "target": 3,
        "description": "Complete 3 lessons today",
        "xp": 100,
        "icon": "📗"
      },
      {
        "id": "lessons_5",
        "type": "lessons",
        "target": 5,
        "description": "Complete 5 lessons today",
        "xp": 150,
        "icon": "🎯"
      },
      {
        "id": "quiz_perfect",
        "type": "quiz_perfect",
        "target": 1,
        "description": "Get 100% on a quiz",
        "xp": 60,
        "icon": "💯"
      },
      {
        "id": "quiz_3",
        "type": "quiz_pass",
        "target": 3,
        "description": "Pass 3 quizzes",
        "xp": 80,
        "icon": "🧩"
      },
      {
        "id": "flashcards_10",
        "type": "flashcards",
        "target": 10,
        "description": "Review 10 flashcards",
        "xp": 50,
        "icon": "🎴"
      },
      {
        "id": "flashcards_25",
        "type": "flashcards",
        "target": 25,
        "description": "Review 25 flashcards",
        "xp": 100,
        "icon": "📁"
      },
      {
        "id": "time_15",
        "type": "study_time",
        "target": 15,
        "description": "Study for 15 minutes",
        "xp": 50,
        "icon": "⌚"
      },
      {
        "id": "time_30",
        "type": "study_time",
        "target": 30,
        "description": "Study for 30 minutes",
        "xp": 75,
        "icon": "🕑"
      },
      {
        "id": "time_60",
        "type": "study_time",
        "target": 60,
        "description": "Study for 1 hour",
        "xp": 150,
        "icon": "🏆"
      },
      {
        "id": "category_new",
        "type": "new_category",
        "target": 1,
        "description": "Start a lesson in a new category",
        "xp": 60,
        "icon": "⭐"
      },
      {
        "id": "early_bird",
        "type": "time_specific",
        "timeStart": 5,
        "timeEnd": 7,
        "target": 1,
        "description": "Complete a lesson before 7am",
        "xp": 75,
        "icon": "🌅"
      },
      {
        "id": "night_owl",
        "type": "time_specific",
        "timeStart": 22,
        "timeEnd": 24,
        "target": 1,
        "description": "Complete a lesson after 10pm",
        "xp": 75,
        "icon": "🌃"
      },
      {
        "id": "workout_log",
        "type": "workout",
        "target": 1,
        "description": "Log a workout",
        "xp": 50,
        "icon": "💪"
      },
      {
        "id": "journal_entry",
        "type": "journal",
        "target": 1,
        "description": "Write a manifestation journal entry",
        "xp": 40,
        "icon": "📝"
      },
      {
        "id": "vision_add",
        "type": "vision",
        "target": 1,
        "description": "Add to your vision board",
        "xp": 50,
        "icon": "🌈"
      }
    ],
    "badges": [
      {
        "id": "streak_3",
        "name": "Getting Started",
        "icon": "🔥",
        "description": "3 day learning streak",
        "category": "streak",
        "requirement": 3,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "streak_7",
        "name": "Week Warrior",
        "icon": "⚔️",
        "description": "7 day learning streak",
        "category": "streak",
        "requirement": 7,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "streak_14",
        "name": "Fortnight Fighter",
        "icon": "🛡️",
        "description": "14 day learning streak",
        "category": "streak",
        "requirement": 14,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "streak_30",
        "name": "Monthly Master",
        "icon": "👑",
        "description": "30 day learning streak",
        "category": "streak",
        "requirement": 30,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "streak_100",
        "name": "Centurion",
        "icon": "🏛️",
        "description": "100 day learning streak",
        "category": "streak",
        "requirement": 100,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "lessons_10",
        "name": "First Steps",
        "icon": "👣",
        "description": "Complete 10 lessons",
        "category": "lessons",
        "requirement": 10,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "lessons_50",
        "name": "Dedicated",
        "icon": "📖",
        "description": "Complete 50 lessons",
        "category": "lessons",
        "requirement": 50,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "lessons_100",
        "name": "Century Club",
        "icon": "💯",
        "description": "Complete 100 lessons",
        "category": "lessons",
        "requirement": 100,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "lessons_500",
        "name": "Knowledge Machine",
        "icon": "🤖",
        "description": "Complete 500 lessons",
        "category": "lessons",
        "requirement": 500,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "book_1",
        "name": "First Book",
        "icon": "📚",
        "description": "Complete your first book",
        "category": "books",
        "requirement": 1,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "book_5",
        "name": "Bookworm",
        "icon": "🐛",
        "description": "Complete 5 books",
        "category": "books",
        "requirement": 5,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "book_10",
        "name": "Library Builder",
        "icon": "🏛️",
        "description": "Complete 10 books",
        "category": "books",
        "requirement": 10,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "book_25",
        "name": "Scholar",
        "icon": "🎓",
        "description": "Complete 25 books",
        "category": "books",
        "requirement": 25,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "night_owl",
        "name": "Night Owl",
        "icon": "🦉",
        "description": "Study after 10pm",
        "category": "time",
        "requirement": 1,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "early_bird",
        "name": "Early Bird",
        "icon": "🌅",
        "description": "Study before 6am",
        "category": "time",
        "requirement": 1,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "weekend_warrior",
        "name": "Weekend Warrior",
        "icon": "🎉",
        "description": "Study on both Saturday and Sunday",
        "category": "time",
        "requirement": 1,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "quiz_perfect_1",
        "name": "Perfect Score",
        "icon": "✅",
        "description": "Get 100% on a quiz",
        "category": "quiz",
        "requirement": 1,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "quiz_perfect_10",
        "name": "Quiz Master",
        "icon": "🧠",
        "description": "Get 100% on 10 quizzes",
        "category": "quiz",
        "requirement": 10,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "quiz_perfect_50",
        "name": "Quiz Legend",
        "icon": "🏆",
        "description": "Get 100% on 50 quizzes",
        "category": "quiz",
        "requirement": 50,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "challenge_7",
        "name": "Challenge Accepted",
        "icon": "🎯",
        "description": "Complete daily challenges 7 days in a row",
        "category": "challenges",
        "requirement": 7,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "challenge_30",
        "name": "Challenge Champion",
        "icon": "🏆",
        "description": "Complete daily challenges 30 days in a row",
        "category": "challenges",
        "requirement": 30,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "category_all",
        "name": "Well-Rounded",
        "icon": "🌐",
        "description": "Complete a lesson in every category",
        "category": "category",
        "requirement": "all",
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "philosophy_10",
        "name": "Philosopher",
        "icon": "🤔",
        "description": "Complete 10 Philosophy lessons",
        "category": "category_specific",
        "categoryId": "philosophy",
        "requirement": 10,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "stoicism_10",
        "name": "Stoic",
        "icon": "🏛️",
        "description": "Complete 10 Stoicism lessons",
        "category": "category_specific",
        "categoryId": "stoicism",
        "requirement": 10,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "psychology_10",
        "name": "Mind Explorer",
        "icon": "🧠",
        "description": "Complete 10 Psychology lessons",
        "category": "category_specific",
        "categoryId": "psychology",
        "requirement": 10,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "xp_1000",
        "name": "Rising Star",
        "icon": "⭐",
        "description": "Earn 1,000 total XP",
        "category": "xp",
        "requirement": 1000,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "xp_5000",
        "name": "XP Hunter",
        "icon": "🎖️",
        "description": "Earn 5,000 total XP",
        "category": "xp",
        "requirement": 5000,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "xp_10000",
        "name": "XP Legend",
        "icon": "💎",
        "description": "Earn 10,000 total XP",
        "category": "xp",
        "requirement": 10000,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "level_10",
        "name": "Double Digits",
        "icon": "🔟",
        "description": "Reach level 10",
        "category": "level",
        "requirement": 10,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "level_25",
        "name": "Quarter Century",
        "icon": "🎂",
        "description": "Reach level 25",
        "category": "level",
        "requirement": 25,
        "unlocked": false,
        "unlockedDate": null
      },
      {
        "id": "level_50",
        "name": "Half Century",
        "icon": "🌟",
        "description": "Reach level 50",
        "category": "level",
        "requirement": 50,
        "unlocked": false,
        "unlockedDate": null
      }
    ],
    "achievements": [
      {
        "id": 1,
        "name": "First Book",
        "icon": "📚",
        "description": "Complete your first book",
        "unlocked": false
      },
      {
        "id": 2,
        "name": "Week Warrior",
        "icon": "🔥",
        "description": "7 day streak",
        "unlocked": false
      },
      {
        "id": 3,
        "name": "Knowledge Seeker",
        "icon": "🎯",
        "description": "Read 10 books",
        "unlocked": false
      },
      {
        "id": 4,
        "name": "Night Owl",
        "icon": "🦉",
        "description": "Study after midnight",
        "unlocked": false
      },
      {
        "id": 5,
        "name": "Early Bird",
        "icon": "🌅",
        "description": "Study before 6am",
        "unlocked": false
      },
      {
        "id": 6,
        "name": "Quiz Master",
        "icon": "✅",
        "description": "100% on 10 quizzes",
        "unlocked": false
      }
    ],
    "learningStats": {
      "lessonsCompleted": 0,
      "quizzesTaken": 0,
      "quizzesPerfect": 0,
      "averageQuizScore": 0,
      "totalStudyMinutes": 0,
      "flashcardsReviewed": 0,
      "categoriesExplored": [],
      "favoriteCategory": null,
      "bestStudyHour": null,
      "studyHistory": [],
      "quizHistory": [],
      "heatMapData": {}
    },
    "flashcards": {
      "cards": [
        {
          "id": 1,
          "bookId": "anatomy-physiology",
          "lessonId": "muscular-system",
          "front": "What are the three types of muscle tissue?",
          "back": "Skeletal muscle (voluntary), Cardiac muscle (heart), and Smooth muscle (involuntary - found in organs)",
          "interval": 1,
          "nextReview": "2026-05-17T14:17:49.872Z",
          "easeFactor": 2.5,
          "reviewCount": 0
        },
        {
          "id": 2,
          "bookId": "anatomy-physiology",
          "lessonId": "muscular-system",
          "front": "What is the function of the deltoid muscle?",
          "back": "The deltoid abducts the arm (raises it to the side), and assists in flexion and extension of the shoulder",
          "interval": 1,
          "nextReview": "2026-05-17T14:17:49.872Z",
          "easeFactor": 2.5,
          "reviewCount": 0
        },
        {
          "id": 3,
          "bookId": "anatomy-physiology",
          "lessonId": "muscular-system",
          "front": "What is muscle hypertrophy?",
          "back": "The increase in muscle size due to an increase in the size of muscle fibers (not the number). Caused by resistance training and adequate protein intake.",
          "interval": 1,
          "nextReview": "2026-05-17T14:17:49.872Z",
          "easeFactor": 2.5,
          "reviewCount": 0
        },
        {
          "id": 4,
          "bookId": "anatomy-physiology",
          "lessonId": "endocrine",
          "front": "What hormone does the pituitary gland release to stimulate testosterone production?",
          "back": "Luteinizing Hormone (LH) - it signals the Leydig cells in the testes to produce testosterone",
          "interval": 1,
          "nextReview": "2026-05-17T14:17:49.872Z",
          "easeFactor": 2.5,
          "reviewCount": 0
        },
        {
          "id": 5,
          "bookId": "anatomy-physiology",
          "lessonId": "endocrine",
          "front": "What is the normal testosterone range for adult males?",
          "back": "300-1000 ng/dL (nanograms per deciliter). Levels below 300 are considered low testosterone.",
          "interval": 1,
          "nextReview": "2026-05-17T14:17:49.872Z",
          "easeFactor": 2.5,
          "reviewCount": 0
        },
        {
          "id": 6,
          "bookId": "atomic-habits",
          "lessonId": "habit-loop",
          "front": "What are the four stages of the habit loop?",
          "back": "Cue â†’ Craving â†’ Response â†’ Reward. The cue triggers a craving, which motivates a response, which provides a reward.",
          "interval": 1,
          "nextReview": "2026-05-17T14:17:49.872Z",
          "easeFactor": 2.5,
          "reviewCount": 0
        },
        {
          "id": 7,
          "bookId": "atomic-habits",
          "lessonId": "habit-loop",
          "front": "What is \"habit stacking\"?",
          "back": "Linking a new habit to an existing habit. Formula: \"After [CURRENT HABIT], I will [NEW HABIT].\" Example: After I pour my morning coffee, I will meditate for 1 minute.",
          "interval": 1,
          "nextReview": "2026-05-17T14:17:49.872Z",
          "easeFactor": 2.5,
          "reviewCount": 0
        },
        {
          "id": 8,
          "bookId": "thinking-fast-slow",
          "lessonId": "system1-system2",
          "front": "What is the difference between System 1 and System 2 thinking?",
          "back": "System 1: Fast, automatic, intuitive, emotional. System 2: Slow, deliberate, analytical, logical. System 1 operates automatically while System 2 requires effort.",
          "interval": 1,
          "nextReview": "2026-05-17T14:17:49.872Z",
          "easeFactor": 2.5,
          "reviewCount": 0
        },
        {
          "id": 9,
          "bookId": "thinking-fast-slow",
          "lessonId": "biases",
          "front": "What is confirmation bias?",
          "back": "The tendency to search for, interpret, and remember information that confirms your pre-existing beliefs while ignoring contradictory evidence.",
          "interval": 1,
          "nextReview": "2026-05-17T14:17:49.872Z",
          "easeFactor": 2.5,
          "reviewCount": 0
        },
        {
          "id": 10,
          "bookId": "meditations",
          "lessonId": "control",
          "front": "What is the dichotomy of control?",
          "back": "The Stoic principle that some things are within our control (our judgments, choices, actions) and some are not (external events, other people's actions). Focus only on what you can control.",
          "interval": 1,
          "nextReview": "2026-05-17T14:17:49.872Z",
          "easeFactor": 2.5,
          "reviewCount": 0
        },
        {
          "id": 11,
          "bookId": "meditations",
          "lessonId": "virtue",
          "front": "What are the four Stoic virtues?",
          "back": "Wisdom (knowing what is good/bad), Courage (doing the right thing despite fear), Justice (treating others fairly), Temperance (self-control and moderation)",
          "interval": 1,
          "nextReview": "2026-05-17T14:17:49.872Z",
          "easeFactor": 2.5,
          "reviewCount": 0
        },
        {
          "id": 12,
          "bookId": "meditations",
          "lessonId": "memento-mori",
          "front": "What does \"Memento Mori\" mean and why is it important?",
          "back": "\"Remember that you will die.\" This Stoic practice reminds us of our mortality to appreciate life, focus on what matters, and not waste time on trivial concerns.",
          "interval": 1,
          "nextReview": "2026-05-17T14:17:49.872Z",
          "easeFactor": 2.5,
          "reviewCount": 0
        },
        {
          "id": 13,
          "bookId": "fitness-fundamentals",
          "lessonId": "macros",
          "front": "How many calories are in each macronutrient per gram?",
          "back": "Protein: 4 calories/gram, Carbohydrates: 4 calories/gram, Fat: 9 calories/gram, Alcohol: 7 calories/gram",
          "interval": 1,
          "nextReview": "2026-05-17T14:17:49.872Z",
          "easeFactor": 2.5,
          "reviewCount": 0
        },
        {
          "id": 14,
          "bookId": "fitness-fundamentals",
          "lessonId": "protein",
          "front": "How much protein should you consume daily for muscle building?",
          "back": "0.7-1g per pound of bodyweight (1.6-2.2g per kg). For a 180lb person, that's 126-180g of protein daily.",
          "interval": 1,
          "nextReview": "2026-05-17T14:17:49.872Z",
          "easeFactor": 2.5,
          "reviewCount": 0
        },
        {
          "id": 15,
          "bookId": "fitness-fundamentals",
          "lessonId": "training",
          "front": "What is progressive overload?",
          "back": "Gradually increasing the stress placed on the body during training (weight, reps, sets, or frequency) to continue making adaptations. Essential for continued muscle and strength gains.",
          "interval": 1,
          "nextReview": "2026-05-17T14:17:49.872Z",
          "easeFactor": 2.5,
          "reviewCount": 0
        }
      ],
      "settings": {
        "newCardsPerDay": 20,
        "reviewsPerDay": 100,
        "initialInterval": 1,
        "easyBonus": 1.3,
        "intervalModifier": 1
      },
      "stats": {
        "totalCards": 0,
        "cardsLearned": 0,
        "cardsDue": 0,
        "averageRetention": 0
      }
    },
    "studyGoals": {
      "dailyMinutes": 30,
      "dailyLessons": 2,
      "weeklyBooks": 1,
      "customGoals": [],
      "currentProgress": {
        "todayMinutes": 0,
        "todayLessons": 0,
        "weekLessons": 0
      }
    },
    "favoriteBooks": [],
    "recentBooks": [],
    "visionBoard": [],
    "manifestationJournal": [],
    "shadowWork": {
      "currentPhase": "exploration",
      "completedExercises": [],
      "archetypes": {
        "innocent": {
          "score": 50,
          "shadow": "Naivety, denial, weakness"
        },
        "orphan": {
          "score": 50,
          "shadow": "Victim mentality, cynicism"
        },
        "hero": {
          "score": 50,
          "shadow": "Arrogance, ruthlessness, aggression"
        },
        "caregiver": {
          "score": 50,
          "shadow": "Martyrdom, enabling, manipulation"
        },
        "explorer": {
          "score": 50,
          "shadow": "Restlessness, aimlessness, inability to commit"
        },
        "rebel": {
          "score": 50,
          "shadow": "Self-destruction, criminality, chaos"
        },
        "lover": {
          "score": 50,
          "shadow": "Obsession, jealousy, loss of identity"
        },
        "creator": {
          "score": 50,
          "shadow": "Perfectionism, drama, inability to finish"
        },
        "jester": {
          "score": 50,
          "shadow": "Cruelty, irresponsibility, deception"
        },
        "sage": {
          "score": 50,
          "shadow": "Dogmatism, disconnection, judgment"
        },
        "magician": {
          "score": 50,
          "shadow": "Manipulation, evil wizard, ego inflation"
        },
        "ruler": {
          "score": 50,
          "shadow": "Tyranny, controlling, entitlement"
        }
      },
      "animaAnimus": {
        "awarenessLevel": 1,
        "integrationNotes": []
      },
      "complexes": [],
      "dreams": [],
      "reflections": []
    },
    "workouts": [],
    "workoutStats": {
      "totalWorkouts": 0,
      "currentStreak": 0,
      "longestStreak": 0,
      "totalMinutes": 0
    },
    "workoutPlans": {
      "activePlan": null,
      "plans": [],
      "customPlans": []
    },
    "bodyMetrics": {
      "entries": [],
      "goals": {
        "targetWeight": null,
        "targetBodyFat": null
      }
    },
    "supplements": {
      "stack": [],
      "log": []
    },
    "trtProtocol": {
      "active": false,
      "protocol": {
        "testosteroneDose": null,
        "frequency": null,
        "lastInjection": null,
        "nextInjection": null
      },
      "bloodwork": [],
      "log": []
    },
    "nutrition": {
      "goals": {
        "calories": 2500,
        "protein": 180,
        "carbs": 250,
        "fats": 80
      },
      "log": []
    },
    "recipeIdeas": [],
    "recipes": [],
    "sampleQuizzes": [
      {
        "question": "What is the difference between System 1 and System 2 thinking?",
        "options": [
          {
            "text": "System 1 is slow, System 2 is fast",
            "correct": false
          },
          {
            "text": "System 1 is fast and automatic, System 2 is slow and deliberate",
            "correct": true
          },
          {
            "text": "System 1 is for math, System 2 is for emotions",
            "correct": false
          },
          {
            "text": "They are the same thing with different names",
            "correct": false
          }
        ],
        "explanation": "System 1 operates automatically and quickly with little effort. System 2 requires conscious attention and deliberate effort. Understanding this helps explain many cognitive biases.",
        "bookTitle": "Thinking, Fast and Slow",
        "lessonTitle": "Two Systems of Thinking"
      },
      {
        "question": "What is confirmation bias?",
        "options": [
          {
            "text": "The tendency to seek information that confirms existing beliefs",
            "correct": true
          },
          {
            "text": "Being overly confident in your abilities",
            "correct": false
          },
          {
            "text": "Remembering things better than they were",
            "correct": false
          },
          {
            "text": "Making decisions based on recent events",
            "correct": false
          }
        ],
        "explanation": "Confirmation bias is our tendency to search for, interpret, and remember information that confirms what we already believe, while ignoring contradictory evidence.",
        "bookTitle": "Thinking, Fast and Slow",
        "lessonTitle": "Cognitive Biases"
      },
      {
        "question": "In the 'bat and ball' problem, if the bat costs $1 more than the ball and together they cost $1.10, how much does the ball cost?",
        "options": [
          {
            "text": "10 cents",
            "correct": false
          },
          {
            "text": "5 cents",
            "correct": true
          },
          {
            "text": "15 cents",
            "correct": false
          },
          {
            "text": "20 cents",
            "correct": false
          }
        ],
        "explanation": "The ball costs 5 cents. If the ball is 5 cents and the bat costs $1 MORE, the bat is $1.05. Total: $1.05 + $0.05 = $1.10. Most people say 10 cents because System 1 gives an intuitive but wrong answer.",
        "bookTitle": "Thinking, Fast and Slow",
        "lessonTitle": "The Laziness of System 2"
      },
      {
        "question": "What is the Stoic 'dichotomy of control'?",
        "options": [
          {
            "text": "Control your emotions at all times",
            "correct": false
          },
          {
            "text": "Focus only on what is within your control, accept what is not",
            "correct": true
          },
          {
            "text": "Control others through logic and reason",
            "correct": false
          },
          {
            "text": "Balance control between work and life",
            "correct": false
          }
        ],
        "explanation": "The dichotomy of control teaches that some things are within our control (our thoughts, actions, judgments) and some are not (external events, others' actions). Peace comes from focusing on what we can control.",
        "bookTitle": "Meditations",
        "lessonTitle": "The Dichotomy of Control"
      },
      {
        "question": "What are the four cardinal Stoic virtues?",
        "options": [
          {
            "text": "Faith, Hope, Love, Charity",
            "correct": false
          },
          {
            "text": "Wisdom, Courage, Justice, Temperance",
            "correct": true
          },
          {
            "text": "Strength, Speed, Intelligence, Charisma",
            "correct": false
          },
          {
            "text": "Truth, Honor, Duty, Loyalty",
            "correct": false
          }
        ],
        "explanation": "The four Stoic virtues are Wisdom (knowing good from bad), Courage (doing right despite fear), Justice (treating others fairly), and Temperance (self-control and moderation).",
        "bookTitle": "Meditations",
        "lessonTitle": "The Four Virtues"
      },
      {
        "question": "What does 'Amor Fati' mean in Stoic philosophy?",
        "options": [
          {
            "text": "Love of wisdom",
            "correct": false
          },
          {
            "text": "Fear of death",
            "correct": false
          },
          {
            "text": "Love of fate - embracing everything that happens",
            "correct": true
          },
          {
            "text": "Acceptance of weakness",
            "correct": false
          }
        ],
        "explanation": "Amor Fati means 'love of fate' - not just accepting what happens, but embracing it as necessary and even desirable. It transforms obstacles into opportunities for growth.",
        "bookTitle": "The Obstacle Is the Way",
        "lessonTitle": "Amor Fati"
      },
      {
        "question": "According to Atomic Habits, what are the four stages of the habit loop?",
        "options": [
          {
            "text": "Plan, Act, Review, Repeat",
            "correct": false
          },
          {
            "text": "Cue, Craving, Response, Reward",
            "correct": true
          },
          {
            "text": "Trigger, Action, Result, Feedback",
            "correct": false
          },
          {
            "text": "Start, Continue, Stop, Restart",
            "correct": false
          }
        ],
        "explanation": "The habit loop consists of: Cue (triggers the behavior), Craving (motivates it), Response (the actual habit), and Reward (the benefit that reinforces it).",
        "bookTitle": "Atomic Habits",
        "lessonTitle": "The Habit Loop"
      },
      {
        "question": "What is 'habit stacking'?",
        "options": [
          {
            "text": "Doing multiple habits at the same time",
            "correct": false
          },
          {
            "text": "Linking a new habit to an existing habit",
            "correct": true
          },
          {
            "text": "Building habits in a specific order",
            "correct": false
          },
          {
            "text": "Removing bad habits one by one",
            "correct": false
          }
        ],
        "explanation": "Habit stacking uses the formula: 'After [CURRENT HABIT], I will [NEW HABIT].' By linking new behaviors to established routines, you leverage existing neural pathways.",
        "bookTitle": "Atomic Habits",
        "lessonTitle": "Habit Stacking"
      },
      {
        "question": "What does the 1% improvement principle suggest?",
        "options": [
          {
            "text": "You should only improve 1% of your habits",
            "correct": false
          },
          {
            "text": "Small daily improvements compound into remarkable results over time",
            "correct": true
          },
          {
            "text": "Focus on one habit at a time",
            "correct": false
          },
          {
            "text": "Spend 1% of your day on self-improvement",
            "correct": false
          }
        ],
        "explanation": "Getting 1% better every day compounds dramatically. 1% daily improvement = 37x better after one year. Small changes appear to make no difference until you cross a critical threshold.",
        "bookTitle": "Atomic Habits",
        "lessonTitle": "The Power of Tiny Gains"
      },
      {
        "question": "What are the three types of muscle tissue in the human body?",
        "options": [
          {
            "text": "Fast, Slow, Medium twitch",
            "correct": false
          },
          {
            "text": "Skeletal, Cardiac, Smooth",
            "correct": true
          },
          {
            "text": "Red, White, Pink",
            "correct": false
          },
          {
            "text": "Upper, Lower, Core",
            "correct": false
          }
        ],
        "explanation": "Skeletal muscle is voluntary (you control it), Cardiac muscle is found only in the heart, and Smooth muscle is involuntary (found in organs, blood vessels, etc.).",
        "bookTitle": "Anatomy & Physiology",
        "lessonTitle": "Muscle Tissue Types"
      },
      {
        "question": "What hormone primarily stimulates testosterone production in males?",
        "options": [
          {
            "text": "Growth Hormone (GH)",
            "correct": false
          },
          {
            "text": "Follicle Stimulating Hormone (FSH)",
            "correct": false
          },
          {
            "text": "Luteinizing Hormone (LH)",
            "correct": true
          },
          {
            "text": "Thyroid Stimulating Hormone (TSH)",
            "correct": false
          }
        ],
        "explanation": "LH (Luteinizing Hormone) from the pituitary gland signals the Leydig cells in the testes to produce testosterone. FSH supports sperm production but not testosterone.",
        "bookTitle": "Anatomy & Physiology",
        "lessonTitle": "The Endocrine System"
      },
      {
        "question": "What is muscle hypertrophy?",
        "options": [
          {
            "text": "Muscle damage from overtraining",
            "correct": false
          },
          {
            "text": "Increase in muscle size due to growth of muscle fibers",
            "correct": true
          },
          {
            "text": "Loss of muscle mass with age",
            "correct": false
          },
          {
            "text": "Muscle twitching during sleep",
            "correct": false
          }
        ],
        "explanation": "Hypertrophy is the increase in muscle size through the enlargement of existing muscle fibers (not creating new fibers). It's achieved through resistance training and adequate protein intake.",
        "bookTitle": "Anatomy & Physiology",
        "lessonTitle": "Muscular Adaptations"
      },
      {
        "question": "How many calories are in one gram of protein?",
        "options": [
          {
            "text": "2 calories",
            "correct": false
          },
          {
            "text": "4 calories",
            "correct": true
          },
          {
            "text": "7 calories",
            "correct": false
          },
          {
            "text": "9 calories",
            "correct": false
          }
        ],
        "explanation": "Protein has 4 calories per gram (same as carbs). Fat has 9 calories per gram, and alcohol has 7 calories per gram.",
        "bookTitle": "Nutrition Fundamentals",
        "lessonTitle": "Macronutrients"
      },
      {
        "question": "What is 'progressive overload' in strength training?",
        "options": [
          {
            "text": "Lifting the heaviest weight possible every session",
            "correct": false
          },
          {
            "text": "Gradually increasing stress on muscles over time to continue adaptations",
            "correct": true
          },
          {
            "text": "Training until complete muscle failure",
            "correct": false
          },
          {
            "text": "Overloading one muscle group per week",
            "correct": false
          }
        ],
        "explanation": "Progressive overload means gradually increasing demands on your muscles (weight, reps, sets, or frequency) to continue making strength and size gains. Without it, progress stalls.",
        "bookTitle": "Fitness Fundamentals",
        "lessonTitle": "Training Principles"
      },
      {
        "question": "How much protein should you consume daily for muscle building (per pound of bodyweight)?",
        "options": [
          {
            "text": "0.2-0.4g per pound",
            "correct": false
          },
          {
            "text": "0.5-0.6g per pound",
            "correct": false
          },
          {
            "text": "0.7-1g per pound",
            "correct": true
          },
          {
            "text": "1.5-2g per pound",
            "correct": false
          }
        ],
        "explanation": "Research supports 0.7-1g of protein per pound of bodyweight (1.6-2.2g per kg) for optimal muscle protein synthesis. More than this shows diminishing returns.",
        "bookTitle": "Nutrition Fundamentals",
        "lessonTitle": "Protein Requirements"
      },
      {
        "question": "In Jungian psychology, what is the 'Shadow'?",
        "options": [
          {
            "text": "Your evil twin personality",
            "correct": false
          },
          {
            "text": "The unconscious parts of yourself you've rejected or denied",
            "correct": true
          },
          {
            "text": "Negative thoughts that follow you",
            "correct": false
          },
          {
            "text": "Past trauma memories",
            "correct": false
          }
        ],
        "explanation": "The Shadow contains all the parts of ourselves we've repressed, denied, or hidden - both 'negative' traits and untapped potential. Shadow work involves integrating these aspects.",
        "bookTitle": "Shadow Work",
        "lessonTitle": "Understanding the Shadow"
      },
      {
        "question": "What is 'projection' in psychological terms?",
        "options": [
          {
            "text": "Planning for the future",
            "correct": false
          },
          {
            "text": "Attributing your own unconscious qualities to others",
            "correct": true
          },
          {
            "text": "Visualizing success",
            "correct": false
          },
          {
            "text": "Speaking confidently",
            "correct": false
          }
        ],
        "explanation": "Projection is when we unconsciously attribute our own repressed traits to others. If something in someone else triggers a strong reaction, it often points to our own Shadow.",
        "bookTitle": "Shadow Work",
        "lessonTitle": "Projection and Triggers"
      },
      {
        "question": "What did Nietzsche mean by 'He who has a why to live can bear almost any how'?",
        "options": [
          {
            "text": "Always ask why before how",
            "correct": false
          },
          {
            "text": "Having purpose and meaning helps you endure any hardship",
            "correct": true
          },
          {
            "text": "Philosophy is more important than action",
            "correct": false
          },
          {
            "text": "The reason for living is asking questions",
            "correct": false
          }
        ],
        "explanation": "This quote emphasizes that having a strong sense of purpose (the 'why') gives you the strength to overcome any challenge or suffering (the 'how'). Purpose provides resilience.",
        "bookTitle": "Man's Search for Meaning",
        "lessonTitle": "The Will to Meaning"
      },
      {
        "question": "What is 'Memento Mori'?",
        "options": [
          {
            "text": "A type of meditation",
            "correct": false
          },
          {
            "text": "Remember that you will die - a reminder of mortality",
            "correct": true
          },
          {
            "text": "A funeral ritual",
            "correct": false
          },
          {
            "text": "Memory improvement technique",
            "correct": false
          }
        ],
        "explanation": "Memento Mori ('remember death') is a Stoic practice of contemplating mortality. Rather than being morbid, it helps prioritize what matters and live more fully in the present.",
        "bookTitle": "Meditations",
        "lessonTitle": "Memento Mori"
      }
    ],
    "sampleFeynmanConcepts": [
      {
        "id": "sample-system1-system2",
        "title": "System 1 vs System 2 Thinking",
        "content": "Your brain operates with two distinct systems. System 1 is fast, automatic, and intuitive - it's what makes you flinch when something flies at your face. System 2 is slow, deliberate, and analytical - it's what you use to solve a math problem. Most of our daily decisions are made by System 1, which is efficient but prone to errors and biases.",
        "book": "Thinking, Fast and Slow",
        "lesson": "Two Systems of Thinking"
      },
      {
        "id": "sample-confirmation-bias",
        "title": "Confirmation Bias",
        "content": "Confirmation bias is our tendency to seek out, interpret, and remember information that confirms what we already believe. We unconsciously filter reality to support our existing worldview. This is why people with opposing political views can look at the same evidence and reach opposite conclusions.",
        "book": "Thinking, Fast and Slow",
        "lesson": "Cognitive Biases"
      },
      {
        "id": "sample-anchoring",
        "title": "The Anchoring Effect",
        "content": "When making estimates, we tend to rely heavily on the first piece of information we receive (the 'anchor') and adjust insufficiently from there. This is why salespeople always show the expensive option first, and why asking for a high salary in negotiations often results in a higher final offer.",
        "book": "Thinking, Fast and Slow",
        "lesson": "Anchoring Effect"
      },
      {
        "id": "sample-dichotomy-control",
        "title": "The Dichotomy of Control",
        "content": "The Stoics divided all things into two categories: things within our control (our thoughts, judgments, and actions) and things outside our control (external events, other people's actions, the past). Peace and wisdom come from focusing your energy only on what you can control and accepting what you cannot.",
        "book": "Meditations",
        "lesson": "The Dichotomy of Control"
      },
      {
        "id": "sample-four-virtues",
        "title": "The Four Stoic Virtues",
        "content": "The Stoics believed that living a good life meant cultivating four cardinal virtues: Wisdom (knowing what is truly good and bad), Courage (doing the right thing despite fear or difficulty), Justice (treating others fairly and honestly), and Temperance (exercising self-control and moderation in all things).",
        "book": "Meditations",
        "lesson": "The Four Virtues"
      },
      {
        "id": "sample-amor-fati",
        "title": "Amor Fati - Love of Fate",
        "content": "Amor Fati means not just accepting everything that happens, but actually loving it and embracing it as necessary. Every obstacle, setback, and challenge becomes fuel for growth. Instead of wishing things were different, you say 'this is exactly what I needed' and find the opportunity within the difficulty.",
        "book": "The Obstacle Is the Way",
        "lesson": "Amor Fati"
      },
      {
        "id": "sample-memento-mori",
        "title": "Memento Mori - Remember Death",
        "content": "Memento Mori is the practice of contemplating your own mortality. Rather than being morbid, this awareness helps you prioritize what truly matters, avoid wasting time on trivial concerns, and live each day with intention. The Stoics kept reminders of death to stay focused on living well.",
        "book": "Meditations",
        "lesson": "Memento Mori"
      },
      {
        "id": "sample-habit-loop",
        "title": "The Habit Loop",
        "content": "Every habit follows a neurological loop with four stages: Cue (a trigger that initiates the behavior), Craving (the motivational force), Response (the actual habit you perform), and Reward (the benefit that satisfies the craving). To build good habits or break bad ones, you can modify any of these four components.",
        "book": "Atomic Habits",
        "lesson": "The Habit Loop"
      },
      {
        "id": "sample-habit-stacking",
        "title": "Habit Stacking",
        "content": "Habit stacking is a technique where you link a new habit to an existing one using the formula: 'After [CURRENT HABIT], I will [NEW HABIT].' Since your brain already has strong neural pathways for existing habits, attaching new behaviors to them makes the new habits much easier to remember and execute.",
        "book": "Atomic Habits",
        "lesson": "Habit Stacking"
      },
      {
        "id": "sample-compound-effect",
        "title": "The Compound Effect of Small Habits",
        "content": "Getting 1% better each day compounds dramatically over time. After one year of 1% daily improvement, you'll be 37 times better. Small habits seem insignificant in the moment, but they accumulate like compound interest. The key is consistency - tiny changes, maintained over time, produce remarkable results.",
        "book": "Atomic Habits",
        "lesson": "The Power of Tiny Gains"
      },
      {
        "id": "sample-muscle-types",
        "title": "Three Types of Muscle Tissue",
        "content": "The body has three distinct types of muscle: Skeletal muscle (attached to bones, voluntary control, responsible for movement), Cardiac muscle (found only in the heart, involuntary, never fatigues), and Smooth muscle (found in organs and blood vessels, involuntary, controls things like digestion and blood pressure).",
        "book": "Anatomy & Physiology",
        "lesson": "Muscle Tissue Types"
      },
      {
        "id": "sample-testosterone",
        "title": "Testosterone Production and Regulation",
        "content": "Testosterone is produced primarily in the Leydig cells of the testes, triggered by Luteinizing Hormone (LH) from the pituitary gland. This is controlled by a feedback loop - when testosterone is high, the brain reduces LH; when it's low, LH increases. Normal male levels range from 300-1000 ng/dL.",
        "book": "Anatomy & Physiology",
        "lesson": "The Endocrine System"
      },
      {
        "id": "sample-hypertrophy",
        "title": "Muscle Hypertrophy",
        "content": "Muscle hypertrophy is the increase in muscle size through enlargement of existing muscle fibers (you don't grow new fibers). It occurs when muscle protein synthesis exceeds breakdown. The main drivers are mechanical tension (heavy weights), metabolic stress (the 'pump'), and muscle damage (micro-tears that repair stronger).",
        "book": "Anatomy & Physiology",
        "lesson": "Muscular Adaptations"
      },
      {
        "id": "sample-progressive-overload",
        "title": "Progressive Overload",
        "content": "Progressive overload is the gradual increase of stress placed on the body during training. Your muscles adapt to the demands you place on them - if the demand stays the same, adaptation stops. You must progressively increase weight, reps, sets, or frequency to continue making strength and muscle gains.",
        "book": "Fitness Fundamentals",
        "lesson": "Training Principles"
      },
      {
        "id": "sample-protein-synthesis",
        "title": "Muscle Protein Synthesis",
        "content": "Muscle Protein Synthesis (MPS) is the process of building new muscle protein. It's elevated for 24-48 hours after resistance training. To maximize muscle growth, you need adequate protein intake (0.7-1g per pound bodyweight) spread across the day, combined with progressive resistance training.",
        "book": "Nutrition Fundamentals",
        "lesson": "Protein and Muscle Growth"
      },
      {
        "id": "sample-macronutrients",
        "title": "Macronutrients and Calories",
        "content": "The three macronutrients provide calories differently: Protein has 4 calories per gram and is essential for muscle repair. Carbohydrates have 4 calories per gram and are the body's preferred energy source. Fat has 9 calories per gram and is crucial for hormones and nutrient absorption. Alcohol has 7 calories per gram but no nutritional value.",
        "book": "Nutrition Fundamentals",
        "lesson": "Macronutrients"
      },
      {
        "id": "sample-shadow-self",
        "title": "The Shadow Self",
        "content": "The Shadow, according to Jung, contains all the parts of ourselves that we've repressed, denied, or hidden from conscious awareness. This includes not just 'negative' traits like anger or selfishness, but also positive qualities we've suppressed. Shadow work involves recognizing, accepting, and integrating these hidden aspects.",
        "book": "Shadow Work",
        "lesson": "Understanding the Shadow"
      },
      {
        "id": "sample-projection",
        "title": "Psychological Projection",
        "content": "Projection occurs when we unconsciously attribute our own repressed qualities to others. If someone's behavior triggers a strong emotional reaction in you, it often points to your own Shadow material. What we hate in others is frequently what we've denied in ourselves. Recognizing projections is a key tool for self-discovery.",
        "book": "Shadow Work",
        "lesson": "Projection and Triggers"
      },
      {
        "id": "sample-will-to-meaning",
        "title": "The Will to Meaning",
        "content": "Viktor Frankl, who survived Nazi concentration camps, discovered that having a sense of purpose and meaning is the primary motivational force in humans. Those who found meaning in their suffering could endure almost anything. As Nietzsche said, 'He who has a why to live can bear almost any how.'",
        "book": "Man's Search for Meaning",
        "lesson": "The Will to Meaning"
      }
    ]
  },
  "exercises": {
    "Romanian Deadlift": {
      "category": "Posterior Chain",
      "icon": "🦵",
      "description": "Hip hinge movement that targets hamstrings and glutes without knee stress",
      "howTo": "Stand with feet hip-width apart, barbell in front of thighs. Push hips back while keeping slight knee bend. Lower bar along legs until you feel hamstring stretch. Drive hips forward to return.",
      "cues": [
        "Push hips BACK, not down",
        "Keep bar close to legs",
        "Slight knee bend - don't lock out",
        "Neutral spine throughout",
        "Feel the stretch in hamstrings"
      ],
      "kneeSafe": true
    },
    "Hip Thrust": {
      "category": "Posterior Chain",
      "icon": "👍",
      "description": "Best glute builder - zero knee stress",
      "howTo": "Upper back on bench, feet flat on floor, barbell across hips. Drive through heels, squeeze glutes at top. Lower with control.",
      "cues": [
        "Chin tucked (look at wall, not ceiling)",
        "Drive through HEELS",
        "Full glute squeeze at top",
        "Don't hyperextend lower back",
        "Feet positioned so shins are vertical at top"
      ],
      "kneeSafe": true
    },
    "Glute Bridge": {
      "category": "Posterior Chain",
      "icon": "🍑",
      "description": "Floor version of hip thrust - great for activation",
      "howTo": "Lie on back, knees bent, feet flat. Drive hips up by squeezing glutes. Hold at top, lower with control.",
      "cues": [
        "Push through heels",
        "Squeeze glutes hard at top",
        "Don't arch lower back",
        "Keep core braced",
        "Hold 2-3 seconds at top"
      ],
      "kneeSafe": true
    },
    "Cable Pull-Through": {
      "category": "Posterior Chain",
      "icon": "🏋️",
      "description": "Cable hip hinge - constant tension on glutes/hamstrings",
      "howTo": "Face away from cable, rope attachment between legs. Hinge at hips, let cable pull you back. Drive hips forward to standing.",
      "cues": [
        "Soft knee bend",
        "Push hips BACK",
        "Feel stretch in hamstrings",
        "Squeeze glutes to stand",
        "Keep arms straight"
      ],
      "kneeSafe": true
    },
    "Good Mornings": {
      "category": "Posterior Chain",
      "icon": "🌅",
      "description": "Barbell hip hinge for hamstrings and lower back",
      "howTo": "Bar on upper back, feet hip-width. Push hips back, lower torso until parallel. Drive hips forward to return.",
      "cues": [
        "Start light - this is challenging",
        "Push hips BACK",
        "Slight knee bend",
        "Keep back flat",
        "Feel hamstring stretch"
      ],
      "kneeSafe": true
    },
    "Reverse Hyperextension": {
      "category": "Posterior Chain",
      "icon": "⬆️",
      "description": "Glutes and lower back with traction benefit",
      "howTo": "Lie face down on bench/machine, hips at edge. Lift legs by squeezing glutes until body is straight. Lower with control.",
      "cues": [
        "Squeeze glutes to lift",
        "Don't swing or use momentum",
        "Control the negative",
        "Great for lower back health",
        "Can use ankle weights"
      ],
      "kneeSafe": true
    },
    "Single-Leg RDL": {
      "category": "Posterior Chain",
      "icon": "🦩",
      "description": "Unilateral hip hinge for balance and hamstrings",
      "howTo": "Stand on one leg, hinge at hip while extending other leg back. Lower until torso parallel, return to standing.",
      "cues": [
        "Keep hips square",
        "Slight bend in standing leg",
        "Reach back with floating leg",
        "Feel hamstring stretch",
        "Use wall for balance if needed"
      ],
      "kneeSafe": true
    },
    "Bench Press": {
      "category": "Upper Push",
      "icon": "💪",
      "description": "Classic chest builder",
      "howTo": "Lie on bench, grip bar slightly wider than shoulders. Lower bar to mid-chest, press up to lockout.",
      "cues": [
        "Retract shoulder blades",
        "Arch upper back slightly",
        "Feet flat on floor",
        "Bar touches chest",
        "Drive through feet"
      ],
      "kneeSafe": true
    },
    "Incline Bench Press": {
      "category": "Upper Push",
      "icon": "📝",
      "description": "Upper chest emphasis",
      "howTo": "Bench at 30-45 degrees. Lower bar to upper chest, press up.",
      "cues": [
        "Same cues as flat bench",
        "Bar path slightly different",
        "Upper chest focus",
        "Don't go too steep",
        "Control the weight"
      ],
      "kneeSafe": true
    },
    "Overhead Press": {
      "category": "Upper Push",
      "icon": "🙌",
      "description": "Shoulder strength and mass builder",
      "howTo": "Bar at shoulders, press straight up overhead. Lower with control.",
      "cues": [
        "Squeeze glutes and core",
        "Press bar UP, not forward",
        "Head through at top",
        "Full lockout overhead",
        "Don't lean back excessively"
      ],
      "kneeSafe": true
    },
    "Dumbbell Press": {
      "category": "Upper Push",
      "icon": "💪",
      "description": "Chest press with dumbbells for better range of motion",
      "howTo": "Lie on bench, dumbbells at chest level. Press up, bringing weights together at top.",
      "cues": [
        "Palms can face forward or neutral",
        "Touch dumbbells at top",
        "Feel chest stretch at bottom",
        "Control the weight",
        "Retract shoulder blades"
      ],
      "kneeSafe": true
    },
    "Push-Ups": {
      "category": "Upper Push",
      "icon": "⬇️",
      "description": "Bodyweight chest and tricep builder",
      "howTo": "Hands slightly wider than shoulders, body straight. Lower chest to floor, push back up.",
      "cues": [
        "Body in straight line",
        "Core tight",
        "Elbows at 45 degrees",
        "Full range of motion",
        "Scale with incline if needed"
      ],
      "kneeSafe": true
    },
    "Dips": {
      "category": "Upper Push",
      "icon": "⏬",
      "description": "Chest and tricep compound movement",
      "howTo": "Support yourself on parallel bars. Lower body by bending elbows, push back up.",
      "cues": [
        "Lean forward for chest focus",
        "Stay upright for triceps",
        "Don't go too deep",
        "Control the movement",
        "Add weight when ready"
      ],
      "kneeSafe": true
    },
    "Tricep Pushdown": {
      "category": "Upper Push",
      "icon": "💪",
      "description": "Tricep isolation",
      "howTo": "Cable at high setting, push down until arms straight. Control the return.",
      "cues": [
        "Keep elbows pinned to sides",
        "Only forearms move",
        "Squeeze at bottom",
        "Control the negative",
        "Don't lean forward"
      ],
      "kneeSafe": true
    },
    "Lateral Raises": {
      "category": "Upper Push",
      "icon": "🦅",
      "description": "Side delt isolation for shoulder width",
      "howTo": "Dumbbells at sides, raise arms out to sides until parallel with floor.",
      "cues": [
        "Slight bend in elbows",
        "Lead with elbows, not hands",
        "Don't go above shoulder height",
        "Control the weight",
        "Light weight, high reps"
      ],
      "kneeSafe": true
    },
    "Deadlift": {
      "category": "Upper Pull",
      "icon": "💪",
      "description": "King of all exercises - full body strength",
      "howTo": "Bar over mid-foot, grip outside knees. Drive through floor, keeping bar close. Stand tall, lower with control.",
      "cues": [
        "Push the floor away",
        "Bar stays close to body",
        "Hips and shoulders rise together",
        "Lockout with glutes",
        "Neutral spine always"
      ],
      "kneeSafe": true
    },
    "Barbell Row": {
      "category": "Upper Pull",
      "icon": "🚣",
      "description": "Back thickness builder",
      "howTo": "Hinge at hips, grip bar. Pull bar to lower chest/upper abs. Lower with control.",
      "cues": [
        "Chest up, back flat",
        "Pull elbows back, not up",
        "Squeeze shoulder blades",
        "Don't use momentum",
        "Feel the lats working"
      ],
      "kneeSafe": true
    },
    "Pull-Ups": {
      "category": "Upper Pull",
      "icon": "⬆️",
      "description": "Best lat builder - bodyweight pulling",
      "howTo": "Hang from bar, pull chest to bar. Lower with control.",
      "cues": [
        "Initiate with lats, not arms",
        "Pull elbows DOWN and BACK",
        "Chest to bar",
        "Control the negative",
        "Use bands if needed"
      ],
      "kneeSafe": true
    },
    "Lat Pulldown": {
      "category": "Upper Pull",
      "icon": "⬇️",
      "description": "Lat isolation - pull-up alternative",
      "howTo": "Grip bar wide, pull to upper chest. Control the return.",
      "cues": [
        "Lean back slightly",
        "Pull elbows down and back",
        "Squeeze lats at bottom",
        "Don't pull behind head",
        "Full stretch at top"
      ],
      "kneeSafe": true
    },
    "Seated Cable Row": {
      "category": "Upper Pull",
      "icon": "🎯",
      "description": "Back thickness with constant tension",
      "howTo": "Sit upright, pull handle to torso. Squeeze back, control return.",
      "cues": [
        "Don't lean back excessively",
        "Pull elbows past torso",
        "Squeeze shoulder blades",
        "Feel the stretch forward",
        "Keep chest up"
      ],
      "kneeSafe": true
    },
    "Face Pulls": {
      "category": "Upper Pull",
      "icon": "😊",
      "description": "Rear delt and rotator cuff health",
      "howTo": "Cable at face height, pull rope to face while externally rotating. Squeeze at end.",
      "cues": [
        "Pull to forehead level",
        "Spread the rope at end",
        "External rotation at finish",
        "Squeeze rear delts",
        "Great for posture"
      ],
      "kneeSafe": true
    },
    "Bicep Curls": {
      "category": "Upper Pull",
      "icon": "💪",
      "description": "Bicep isolation",
      "howTo": "Dumbbells at sides, curl up while supinating. Lower with control.",
      "cues": [
        "Keep elbows pinned",
        "Full range of motion",
        "Squeeze at top",
        "Control the negative",
        "Don't swing"
      ],
      "kneeSafe": true
    },
    "Hammer Curls": {
      "category": "Upper Pull",
      "icon": "🔍¨",
      "description": "Brachialis and forearm focus",
      "howTo": "Neutral grip (palms facing each other), curl up. Lower with control.",
      "cues": [
        "Palms stay facing each other",
        "Elbows stay still",
        "Full range of motion",
        "Builds forearm size",
        "Alternate or together"
      ],
      "kneeSafe": true
    },
    "Planks": {
      "category": "Core",
      "icon": "📝",
      "description": "Core stability foundation",
      "howTo": "Forearms and toes on floor, body straight. Hold position.",
      "cues": [
        "Squeeze glutes",
        "Brace core like taking a punch",
        "Don't let hips sag",
        "Don't pike up",
        "Breathe steadily"
      ],
      "kneeSafe": true
    },
    "Dead Bug": {
      "category": "Core",
      "icon": "🐛",
      "description": "Anti-extension core work - great for back health",
      "howTo": "Lie on back, arms up, knees at 90°. Lower opposite arm and leg while keeping back flat.",
      "cues": [
        "Press lower back into floor",
        "Move slowly and controlled",
        "Don't let back arch",
        "Exhale as you extend",
        "Great for core control"
      ],
      "kneeSafe": true
    },
    "Bird Dog": {
      "category": "Core",
      "icon": "🐕",
      "description": "Core stability and lower back health",
      "howTo": "On hands and knees, extend opposite arm and leg. Hold, return, switch sides.",
      "cues": [
        "Keep hips level",
        "Don't rotate",
        "Extend fully",
        "Hold 2-3 seconds",
        "Move with control"
      ],
      "kneeSafe": true
    },
    "Pallof Press": {
      "category": "Core",
      "icon": "🚫",
      "description": "Anti-rotation core strength",
      "howTo": "Cable at chest height, stand perpendicular. Press handle straight out, resist rotation.",
      "cues": [
        "Don't let cable rotate you",
        "Press straight out",
        "Hold at full extension",
        "Feel obliques working",
        "Great for sports"
      ],
      "kneeSafe": true
    },
    "Ab Wheel Rollout": {
      "category": "Core",
      "icon": "🎡",
      "description": "Advanced anti-extension core work",
      "howTo": "Kneel with wheel in front. Roll forward as far as possible while maintaining flat back. Pull back.",
      "cues": [
        "Keep core braced TIGHT",
        "Don't let back arch",
        "Start with short range",
        "Progress distance over time",
        "Squeeze glutes"
      ],
      "kneeSafe": true
    },
    "Hanging Leg Raise": {
      "category": "Core",
      "icon": "🦵",
      "description": "Lower ab focus",
      "howTo": "Hang from bar, raise legs to parallel or higher. Lower with control.",
      "cues": [
        "Don't swing",
        "Posterior pelvic tilt",
        "Control the negative",
        "Bend knees to make easier",
        "Keep it strict"
      ],
      "kneeSafe": true
    }
  },
  "moonPhases": {
    "current": {
      "phase": "Waxing Crescent",
      "emoji": "🌒",
      "percentage": 23,
      "nextPhase": "First Quarter",
      "daysUntilNext": 3,
      "description": "Time for setting intentions and planting seeds for your manifestations. Focus on growth and expansion.",
      "manifestationFocus": "Clarity and vision-setting"
    },
    "phases": [
      {
        "name": "New Moon",
        "emoji": "🌑",
        "description": "New beginnings, fresh starts, set intentions"
      },
      {
        "name": "Waxing Crescent",
        "emoji": "🌒",
        "description": "Growth, expansion, taking action"
      },
      {
        "name": "First Quarter",
        "emoji": "🌓",
        "description": "Decision-making, overcoming challenges"
      },
      {
        "name": "Waxing Gibbous",
        "emoji": "🌔",
        "description": "Refinement, adjustment, preparation"
      },
      {
        "name": "Full Moon",
        "emoji": "🌕",
        "description": "Manifestation, celebration, release"
      },
      {
        "name": "Waning Gibbous",
        "emoji": "🌖",
        "description": "Gratitude, sharing, teaching"
      },
      {
        "name": "Last Quarter",
        "emoji": "🌗",
        "description": "Release, forgiveness, letting go"
      },
      {
        "name": "Waning Crescent",
        "emoji": "🌘",
        "description": "Rest, reflection, surrender"
      }
    ]
  },
  "shadowWorkExercises": [
    {
      "id": 1,
      "title": "Mirror Work: Meeting Your Shadow",
      "icon": "🪞",
      "category": "exploration",
      "phase": "beginner",
      "prompt": "What traits do you dislike most in others? These often reflect aspects of yourself you've disowned. List 3-5 traits that trigger you in others, then explore where you might exhibit these same traits.",
      "questions": [
        "What behaviors in others make you most uncomfortable?",
        "When have you displayed similar behaviors?",
        "What would accepting this part of yourself feel like?"
      ],
      "jungianConcept": "Projection - We see in others what we deny in ourselves"
    },
    {
      "id": 2,
      "title": "The Golden Shadow: Reclaiming Your Power",
      "icon": "✨",
      "category": "integration",
      "phase": "beginner",
      "prompt": "What qualities do you admire in others but believe you don't possess? These are aspects of your 'golden shadow' - positive traits you've projected onto others instead of owning them yourself.",
      "questions": [
        "Who do you admire and why?",
        "What stops you from embodying these qualities?",
        "How would your life change if you claimed these traits?"
      ],
      "jungianConcept": "The Golden Shadow contains our unrealized potential"
    },
    {
      "id": 3,
      "title": "Childhood Wounds & Complexes",
      "icon": "🧸",
      "category": "healing",
      "phase": "intermediate",
      "prompt": "Jung described complexes as emotionally charged clusters of ideas. Explore a recurring pattern or struggle in your life - often these trace back to childhood experiences and the coping mechanisms we developed.",
      "questions": [
        "What pattern keeps repeating in your life?",
        "When did you first experience this pattern?",
        "What belief did you form about yourself from that experience?",
        "What emotional charge do you feel when triggered?"
      ],
      "jungianConcept": "Complexes are autonomous fragments of the psyche with their own energy"
    },
    {
      "id": 4,
      "title": "The Inner Critic (Negative Animus/Anima)",
      "icon": "🗣️",
      "category": "exploration",
      "phase": "intermediate",
      "prompt": "Your inner critic is often an internalized voice from your past, sometimes representing a negative animus (in women) or anima (in men). Give it a character - what does it look like? Sound like? What does it want to protect you from?",
      "questions": [
        "What does your inner critic typically say?",
        "Whose voice does it sound like?",
        "What is it trying to protect you from?",
        "Is this voice masculine or feminine in character?"
      ],
      "jungianConcept": "The negative anima/animus can manifest as the inner critic"
    },
    {
      "id": 5,
      "title": "The 12 Archetypes",
      "icon": "👑",
      "category": "integration",
      "phase": "beginner",
      "prompt": "Jung identified 12 primary archetypes, each with light and shadow aspects. Which archetypes are most active in your life? Which are you avoiding or suppressing?",
      "questions": [
        "Which archetypal patterns do you recognize in yourself?",
        "Which archetypes do you avoid or judge in others?",
        "How might integrating a suppressed archetype serve you?",
        "What is the shadow side of your dominant archetype?"
      ],
      "jungianConcept": "Archetypes are universal patterns inherited from the collective unconscious",
      "archetypeList": [
        {
          "name": "Innocent",
          "light": "Optimism, faith, purity",
          "shadow": "Denial, naivety"
        },
        {
          "name": "Orphan",
          "light": "Realism, empathy, resilience",
          "shadow": "Victim, cynic"
        },
        {
          "name": "Hero",
          "light": "Courage, discipline, mastery",
          "shadow": "Arrogance, ruthlessness"
        },
        {
          "name": "Caregiver",
          "light": "Compassion, generosity",
          "shadow": "Martyrdom, manipulation"
        },
        {
          "name": "Explorer",
          "light": "Freedom, authenticity",
          "shadow": "Aimlessness, alienation"
        },
        {
          "name": "Rebel",
          "light": "Liberation, radical freedom",
          "shadow": "Destruction, criminality"
        },
        {
          "name": "Lover",
          "light": "Passion, commitment, appreciation",
          "shadow": "Obsession, jealousy"
        },
        {
          "name": "Creator",
          "light": "Innovation, imagination, vision",
          "shadow": "Perfectionism, drama"
        },
        {
          "name": "Jester",
          "light": "Joy, humor, living fully",
          "shadow": "Cruelty, irresponsibility"
        },
        {
          "name": "Sage",
          "light": "Wisdom, truth, understanding",
          "shadow": "Dogmatism, judgment"
        },
        {
          "name": "Magician",
          "light": "Transformation, vision",
          "shadow": "Manipulation, deceit"
        },
        {
          "name": "Ruler",
          "light": "Leadership, responsibility",
          "shadow": "Tyranny, control"
        }
      ]
    },
    {
      "id": 6,
      "title": "Dream Analysis",
      "icon": "💭",
      "category": "exploration",
      "phase": "intermediate",
      "prompt": "Jung said dreams are the royal road to the unconscious. They speak in symbols, showing us aspects of ourselves we haven't integrated. Record a recent dream and explore its symbols, emotions, and messages.",
      "questions": [
        "What was the dominant emotion in the dream?",
        "What symbols or characters appeared?",
        "What aspect of yourself might each symbol represent?",
        "What message might your unconscious be sending?"
      ],
      "jungianConcept": "Dreams compensate for one-sided conscious attitudes"
    },
    {
      "id": 7,
      "title": "Anima/Animus Integration",
      "icon": "⚧️",
      "category": "integration",
      "phase": "advanced",
      "prompt": "The anima (in men) represents the feminine unconscious; the animus (in women) represents the masculine unconscious. Integrating this contrasexual element is crucial for wholeness. How does your inner opposite-gender figure appear to you?",
      "questions": [
        "How do you typically relate to the opposite gender?",
        "What qualities of the opposite sex do you admire or reject?",
        "In dreams, how do opposite-sex figures appear?",
        "How might integrating these qualities benefit you?"
      ],
      "jungianConcept": "The anima/animus is the soul-image and bridge to the unconscious"
    },
    {
      "id": 8,
      "title": "The Persona vs. True Self",
      "icon": "🎭",
      "category": "exploration",
      "phase": "beginner",
      "prompt": "The persona is the mask we wear in public - our social role. But over-identification with the persona leads to losing touch with our true self. What masks do you wear, and who are you underneath?",
      "questions": [
        "What roles do you play in different areas of life?",
        "Which version of yourself feels most 'you'?",
        "What parts of yourself do you hide from others?",
        "What would happen if you dropped your masks?"
      ],
      "jungianConcept": "The persona is necessary but must not be mistaken for the whole self"
    },
    {
      "id": 9,
      "title": "Encountering the Self",
      "icon": "☯️",
      "category": "integration",
      "phase": "advanced",
      "prompt": "The Self (capital S) is the archetype of wholeness - the totality of the psyche including conscious and unconscious. It often appears in dreams as a mandala, divine child, or wise old figure. Have you experienced glimpses of the Self?",
      "questions": [
        "When have you felt truly whole and integrated?",
        "What symbols of wholeness appear in your dreams?",
        "What would complete integration look like for you?",
        "How do you experience moments of transcendence?"
      ],
      "jungianConcept": "The Self is both the center and circumference of the psyche"
    },
    {
      "id": 10,
      "title": "The Collective Unconscious",
      "icon": "🌐",
      "category": "exploration",
      "phase": "advanced",
      "prompt": "Beyond our personal unconscious lies the collective unconscious - shared by all humanity. It contains archetypes, myths, and universal symbols. What universal themes appear in your psyche?",
      "questions": [
        "What myths or fairy tales resonate deeply with you?",
        "Do you have dreams with universal symbols (water, snakes, flying)?",
        "What archetypal stories are you living out?",
        "How do you connect with something greater than yourself?"
      ],
      "jungianConcept": "The collective unconscious connects us to all of humanity"
    },
    {
      "id": 11,
      "title": "Active Imagination",
      "icon": "🔍®",
      "category": "practice",
      "phase": "advanced",
      "prompt": "Active imagination is Jung's technique for dialoguing with unconscious figures. In a relaxed state, visualize a figure from your dreams or fantasies and have a conversation with them. What do they have to say?",
      "questions": [
        "What figure from your unconscious wants to speak?",
        "What does this figure look like and feel like?",
        "What message does it have for you?",
        "How can you honor what it represents?"
      ],
      "jungianConcept": "Active imagination bridges conscious and unconscious minds"
    },
    {
      "id": 12,
      "title": "Individuation Journey Map",
      "icon": "🗺️",
      "category": "integration",
      "phase": "advanced",
      "prompt": "Individuation is the lifelong process of becoming who you truly are - integrating all parts of the psyche. Where are you on this journey? What stages have you completed, and what lies ahead?",
      "questions": [
        "What shadow aspects have you already integrated?",
        "What persona masks have you released?",
        "How is your anima/animus integration progressing?",
        "What does your unique wholeness look like?"
      ],
      "jungianConcept": "Individuation is becoming a single, homogeneous being - your true Self"
    }
  ],
  "categories": [
    {
      "id": "psychology",
      "name": "Psychology",
      "icon": "🧠",
      "color": "#8b5cf6",
      "description": "Understanding the human mind",
      "books": ((typeof window !== 'undefined' && window.SYN_INLINE_BOOKS && window.SYN_INLINE_BOOKS["psychology"]) || [])
    },
    {
      "id": "productivity",
      "name": "Productivity",
      "icon": "⚡",
      "color": "#6366f1",
      "description": "Master your time and energy",
      "books": ((typeof window !== 'undefined' && window.SYN_INLINE_BOOKS && window.SYN_INLINE_BOOKS["productivity"]) || [])
    },
    {
      "id": "philosophy",
      "name": "Philosophy",
      "icon": "🤔",
      "color": "#ec4899",
      "description": "Ancient wisdom for modern life",
      "books": ((typeof window !== 'undefined' && window.SYN_INLINE_BOOKS && window.SYN_INLINE_BOOKS["philosophy"]) || [])
    },
    {
      "id": "personal-development",
      "name": "Personal Development",
      "icon": "🌱",
      "color": "#10b981",
      "description": "Become your best self",
      "books": ((typeof window !== 'undefined' && window.SYN_INLINE_BOOKS && window.SYN_INLINE_BOOKS["personal-development"]) || [])
    },
    {
      "id": "health",
      "name": "Health & Wellness",
      "icon": "❤️",
      "color": "#10b981",
      "description": "Optimize your body and mind",
      "books": ((typeof window !== 'undefined' && window.SYN_INLINE_BOOKS && window.SYN_INLINE_BOOKS["health"]) || [])
    },
    {
      "id": "business",
      "name": "Business",
      "icon": "💼",
      "color": "#6366f1",
      "description": "Build and scale ventures",
      "books": ((typeof window !== 'undefined' && window.SYN_INLINE_BOOKS && window.SYN_INLINE_BOOKS["business"]) || [])
    },
    {
      "id": "leadership",
      "name": "Leadership",
      "icon": "👑",
      "color": "#ef4444",
      "description": "Lead with impact",
      "books": ((typeof window !== 'undefined' && window.SYN_INLINE_BOOKS && window.SYN_INLINE_BOOKS["leadership"]) || [])
    },
    {
      "id": "science",
      "name": "Science & Technology",
      "icon": "🔬",
      "color": "#06b6d4",
      "description": "Explore the future",
      "books": ((typeof window !== 'undefined' && window.SYN_INLINE_BOOKS && window.SYN_INLINE_BOOKS["science"]) || [])
    },
    {
      "id": "anatomy-physiology",
      "name": "Anatomy & Physiology",
      "icon": "🫀",
      "color": "#ef4444",
      "description": "Master the human body",
      "books": []
    },
    {
      "id": "critical-thinking",
      "name": "Critical Thinking",
      "icon": "🧩",
      "color": "#8b5cf6",
      "description": "Sharpen your analytical mind",
      "books": ((typeof window !== 'undefined' && window.SYN_INLINE_BOOKS && window.SYN_INLINE_BOOKS["critical-thinking"]) || [])
    },
    {
      "id": "stoicism",
      "name": "Stoicism",
      "icon": "⚖️",
      "color": "#6366f1",
      "description": "Ancient wisdom for modern resilience",
      "books": ((typeof window !== 'undefined' && window.SYN_INLINE_BOOKS && window.SYN_INLINE_BOOKS["stoicism"]) || [])
    },
    {
      "id": "health-wellness",
      "name": "Mind & Body",
      "icon": "🧘",
      "color": "#10b981",
      "description": "Optimize body and mind",
      "books": ((typeof window !== 'undefined' && window.SYN_INLINE_BOOKS && window.SYN_INLINE_BOOKS["health-wellness"]) || [])
    },
    {
      "id": "seo-marketing",
      "name": "SEO & Marketing",
      "icon": "📈",
      "color": "#f59e0b",
      "description": "Master digital marketing",
      "books": ((typeof window !== 'undefined' && window.SYN_INLINE_BOOKS && window.SYN_INLINE_BOOKS["seo-marketing"]) || [])
    },
    {
      "id": "career-success",
      "name": "Career Success",
      "icon": "🎯",
      "color": "#ec4899",
      "description": "Build your dream career",
      "books": ((typeof window !== 'undefined' && window.SYN_INLINE_BOOKS && window.SYN_INLINE_BOOKS["career-success"]) || [])
    },
    {
      "id": "data-analytics",
      "name": "Data Analytics & Microsoft 365",
      "icon": "📊",
      "color": "#0ea5e9",
      "description": "Master data skills & Microsoft Office",
      "books": []
    },
    {
      "id": "history",
      "name": "History",
      "icon": "📜",
      "color": "#b45309",
      "description": "Learn from the past",
      "books": ((typeof window !== 'undefined' && window.SYN_INLINE_BOOKS && window.SYN_INLINE_BOOKS["history"]) || [])
    },
    {
      "id": "him",
      "name": "Health Information Management",
      "icon": "🏥",
      "color": "#0d9488",
      "description": "HIM Degree Program - Coding, Compliance & Healthcare Data",
      "books": []
    },
    {
      "id": "medical-billing-coding",
      "name": "Medical Billing, Coding & HIM Track",
      "icon": "🩺",
      "color": "#0ea5e9",
      "description": "Your full Medical Billing, Coding & HIM curriculum — paired with the Exam Center for unlock-gated mastery practice. Insurance, the revenue cycle, ICD-10/CPT/HCPCS, claims, compliance, statistics, analytics, health IT, and quality reporting.",
      "examCenterTrack": true,
      "books": ((typeof window !== 'undefined' && window.SYN_INLINE_BOOKS && window.SYN_INLINE_BOOKS["medical-billing-coding"]) || [])
    },
    {
      "id": "religion-spirituality",
      "name": "Religion & Spirituality",
      "icon": "🕉️",
      "color": "#a855f7",
      "description": "Comparative study of world religions and spiritual traditions.",
      "books": ((typeof window !== 'undefined' && window.SYN_INLINE_BOOKS && window.SYN_INLINE_BOOKS["religion-spirituality"]) || [])
    }
  ,
    {
      "id": "philosophy-college",
      "name": "Philosophy: The Complete Course",
      "icon": "🏛️",
      "color": "#a78bfa",
      "description": "College-depth philosophy — the great thinkers, the overlooked ones, the arguments, and how to think critically.",
      "books": ((typeof window !== 'undefined' && window.SYN_INLINE_BOOKS && window.SYN_INLINE_BOOKS["philosophy-college"]) || [])
    }
  ],
  "dailyInsights": [
    {
      "title": "The Power of Tiny Habits",
      "book": "Atomic Habits",
      "excerpt": "Discover how 1% improvements compound into remarkable results over time...",
      "duration": 5,
      "bookId": "atomic-habits",
      "lessonId": 1
    },
    {
      "title": "Two Systems of Thinking",
      "book": "Thinking, Fast and Slow",
      "excerpt": "Learn how your brain uses two different systems to make decisions...",
      "duration": 6,
      "bookId": "thinking-fast-slow",
      "lessonId": 1
    },
    {
      "title": "The Stoic Art of Resilience",
      "book": "The Obstacle is the Way",
      "excerpt": "Transform every obstacle into an opportunity with ancient wisdom...",
      "duration": 5,
      "bookId": "obstacle-is-way",
      "lessonId": 1
    }
  ]
};

// Helper function to get all books across categories
function getAllBooks() {
    return APP_DATA.categories.flatMap(category => category.books);
}

// Helper function to get book by ID
function getBookById(bookId) {
    const allBooks = getAllBooks();
    return allBooks.find(book => book.id === bookId);
}

// Helper function to get books in progress
function getBooksInProgress() {
    return getAllBooks().filter(book => book.progress > 0 && book.progress < 100);
}

// Helper function to get featured books
// Helper function to get featured books — DAILY ROTATION over the whole library.
// The `featured` flag is not a gate: every book takes its turn here, the same
// way it does on the Trending shelf. The two shelves differ by rhythm, not by
// membership — Trending turns over on Mondays, this one at local midnight.
//
// Books currently on the Trending shelf are filtered out first so the home page
// never shows the same cover twice. If that leaves too few to fill the row,
// we fall back to the unfiltered set rather than render a stub.
function getFeaturedBooks(limit = SHELF_SIZE) {
    const all = getAllBooks();
    if (all.length === 0) return [];

    const trendingIds = new Set(getTrendingBooks().map(b => b.id));
    let pool = all.filter(b => !trendingIds.has(b.id));
    if (pool.length < limit) pool = all;

    // Days since epoch — same set for every visit on a given day, no randomness.
    const day = Math.floor(new Date().setHours(0, 0, 0, 0) / 86400000);
    const count = Math.min(limit, pool.length);
    const picks = [];
    const seen = new Set();
    // Stride by a prime so consecutive days land on a different part of the pool.
    // The seen-guard and the bounded loop keep a shared factor from repeating a book.
    for (let i = 0; picks.length < count && i < pool.length * 2; i++) {
        const book = pool[(day * count + i * 17) % pool.length];
        if (seen.has(book.id)) continue;
        seen.add(book.id);
        picks.push(book);
    }
    return picks;
}

// How many books each home-page shelf shows. Trending, Featured Picks and
// What's New all use this so the three rows stay the same length.
const SHELF_SIZE = 7;

// What's New runs longer than the rotating shelves, because books arrive faster
// than the other two turn over. Not much longer, though: the dates come from
// when each book's module file was created, so the two bulk extractions show up
// as ~200 books on one day. Reach far past a week and the shelf fills with those
// rather than with anything new.
const WHATS_NEW_SIZE = 10;

// Helper function to get trending books — WEEKLY ROTATION
// Picks 8 books that change every Monday based on ISO week-of-year.
// Same books for everyone within a given week, deterministic, no randomness.
function getTrendingBooks() {
    // Pool = the WHOLE library. The `trending` flag is no longer a gate —
    // every book takes its turn on the shelf, not just a marked handful.
    const pool = getAllBooks();
    if (pool.length === 0) return [];
    // Turns over every few days. Weekly was too slow for a library this size —
    // 8 books a week against ~294 is roughly a nine-month cycle, so a book
    // could wait most of a year for its turn. Three days cuts that to about
    // four months while still reading as a considered selection next to the
    // Featured shelf, which changes daily.
    const ROTATION_DAYS = 3;
    const day = Math.floor(new Date().setHours(0, 0, 0, 0) / 86400000);
    const period = Math.floor(day / ROTATION_DAYS);
    const count = Math.min(SHELF_SIZE, pool.length);
    const picks = [];
    const seen = new Set();
    // Advance by `count` so consecutive periods don't share a book, and stride
    // by a prime so a single period's set is spread across the library.
    for (let i = 0; picks.length < count && i < pool.length * 2; i++) {
        const book = pool[(period * count + i * 13) % pool.length];
        if (seen.has(book.id)) continue;
        seen.add(book.id);
        picks.push(book);
    }
    return picks;
}

// Helper function to get "What's New" — books added or rebuilt recently.
// Books have no dateAdded timestamp, so this used to rely on a
// hand-maintained allowlist of ids (WHATS_NEW_BOOK_IDS) — which meant any
// book added after that list was last updated could never appear here,
// no matter how new it actually was. New content is appended to the end
// of a category's own books array (see BOOK-CREATION-TEMPLATE.md), so the
// last book in EACH category is a self-maintaining proxy for "recently
// added to that category" — no ongoing upkeep required, and a book added
// to any category (not just whichever category happens to be last
// overall) shows up here immediately.
// Helper function to get "What's New" — the most recently added books.
//
// Books carry no dateAdded of their own, so the dates come from
// book-added-on-data.js, which tools/gen-book-added-on.cjs derives from git:
// the commit that first added each external book module. That is a real signal
// and it maintains itself — add a book, regenerate, and it leads this shelf.
//
// Two books occasionally share a title with different ids (a short and a full
// treatment of the same work, say), and showing both here reads as a bug, so
// the shelf keeps only the newer of a title.
//
// If the map is missing entirely, fall back to the previous behaviour — the
// last book of each category — so the shelf still fills.
function getWhatsNewBooks(limit = WHATS_NEW_SIZE) {
    const added = (typeof window !== 'undefined' && window.BOOK_ADDED_ON) || {};
    const dated = getAllBooks()
        .filter(b => added[b.id])
        .sort((a, b) => added[b.id].localeCompare(added[a.id]) || String(a.title).localeCompare(String(b.title)));

    const newest = [];
    const titles = new Set();
    for (const book of dated) {
        if (newest.length >= limit) break;
        const key = String(book.title).toLowerCase();
        if (titles.has(key)) continue;
        titles.add(key);
        newest.push(book);
    }
    if (newest.length) return newest;

    const fallback = [];
    APP_DATA.categories.forEach(category => {
        const books = category.books || [];
        if (books.length > 0) fallback.push(books[books.length - 1]);
    });
    return fallback.slice(0, limit);
}

// Helper function to get category by ID
function getCategoryById(categoryId) {
    return APP_DATA.categories.find(cat => cat.id === categoryId);
}

// Global date formatter - MM/DD/YYYY format
function formatDateMMDDYYYY(dateString) {
    // Handle YYYY-MM-DD format without timezone shift
    if (typeof dateString === 'string' && dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const [year, month, day] = dateString.split('-');
        return `${month}/${day}/${year}`;
    }
    // Handle ISO strings or other formats - use UTC to avoid timezone shift
    const date = new Date(dateString);
    if (dateString && dateString.includes && !dateString.includes('T')) {
        // Date-only string, use UTC methods
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const year = date.getUTCFullYear();
        return `${month}/${day}/${year}`;
    }
    // Full datetime string, use local time
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

// Data version - increment when making breaking changes
const DATA_VERSION = 4;

// Helper function to save progress to localStorage
function saveProgress() {
    try {
        // Only save user data, not static category content
        const dataToSave = {
            user: APP_DATA.user,
            _version: DATA_VERSION
        };
        localStorage.setItem('synthesisProgress', JSON.stringify(dataToSave));
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            console.error('localStorage quota exceeded! Current usage:', getStorageUsage());
            alert('Storage is full! Please clear some data from Settings or browser storage.');
        } else {
            console.error('Error saving progress:', e);
        }
    }
}

// Check localStorage usage
function getStorageUsage() {
    let total = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            total += localStorage[key].length * 2; // UTF-16 = 2 bytes per char
        }
    }
    return (total / 1024 / 1024).toFixed(2) + ' MB';
}

// ============================================
// FULL APP RESET FUNCTION
// Resets ALL progress to Day 0 / Fresh Start
// ============================================
function resetAllProgress() {
    // Clear all localStorage data
    localStorage.removeItem('synthesisProgress');
    localStorage.removeItem('codingUpdatesLastChecked');
    localStorage.removeItem('lastVisit');

    // Reset user stats
    APP_DATA.user.streak = 0;
    APP_DATA.user.booksCompleted = 0;
    APP_DATA.user.totalLearningTime = 0;
    APP_DATA.user.lastActiveDate = null;
    APP_DATA.user.xp = 0;
    APP_DATA.user.level = 1;
    APP_DATA.user.xpToNextLevel = 100;
    APP_DATA.user.totalXpEarned = 0;

    // Reset daily challenges
    APP_DATA.user.dailyChallenges = {
        currentDate: null,
        challenges: [],
        completedToday: [],
        totalChallengesCompleted: 0,
        currentChallengeStreak: 0,
        longestChallengeStreak: 0
    };

    // Reset all badges to locked
    APP_DATA.user.badges.forEach(badge => {
        badge.unlocked = false;
        badge.unlockedDate = null;
    });

    // Reset legacy achievements
    APP_DATA.user.achievements.forEach(achievement => {
        achievement.unlocked = false;
    });

    // Reset learning stats
    APP_DATA.user.learningStats = {
        lessonsCompleted: 0,
        quizzesTaken: 0,
        quizzesPerfect: 0,
        averageQuizScore: 0,
        totalStudyMinutes: 0,
        flashcardsReviewed: 0,
        categoriesExplored: [],
        favoriteCategory: null,
        bestStudyHour: null,
        studyHistory: [],
        quizHistory: [],
        heatMapData: {}
    };

    // Reset flashcards to initial state
    APP_DATA.user.flashcards.cards.forEach(card => {
        card.interval = 1;
        card.nextReview = new Date().toISOString();
        card.easeFactor = 2.5;
        card.reviewCount = 0;
    });
    APP_DATA.user.flashcards.stats = {
        totalCards: 0,
        cardsLearned: 0,
        cardsDue: 0,
        averageRetention: 0
    };

    // Reset study goals progress
    APP_DATA.user.studyGoals.currentProgress = {
        todayMinutes: 0,
        todayLessons: 0,
        weekLessons: 0
    };

    // Reset favorites and recent
    APP_DATA.user.favoriteBooks = [];
    APP_DATA.user.recentBooks = [];

    // Reset premium features
    APP_DATA.user.visionBoard = [];
    APP_DATA.user.manifestationJournal = [];
    APP_DATA.user.shadowWork = {
        currentPhase: "exploration",
        completedExercises: [],
        archetypes: {
            innocent: { score: 50, shadow: "Naivety, denial, weakness" },
            orphan: { score: 50, shadow: "Victim mentality, cynicism" },
            hero: { score: 50, shadow: "Arrogance, ruthlessness, aggression" },
            caregiver: { score: 50, shadow: "Martyrdom, enabling, manipulation" },
            explorer: { score: 50, shadow: "Restlessness, aimlessness, inability to commit" },
            rebel: { score: 50, shadow: "Self-destruction, criminality, chaos" },
            lover: { score: 50, shadow: "Obsession, jealousy, loss of identity" },
            creator: { score: 50, shadow: "Perfectionism, drama, inability to finish" },
            jester: { score: 50, shadow: "Cruelty, irresponsibility, deception" },
            sage: { score: 50, shadow: "Dogmatism, disconnection, judgment" },
            magician: { score: 50, shadow: "Manipulation, evil wizard, ego inflation" },
            ruler: { score: 50, shadow: "Tyranny, controlling, entitlement" }
        },
        animaAnimus: {
            awarenessLevel: 1,
            integrationNotes: []
        },
        complexes: [],
        dreams: [],
        reflections: []
    };

    // Reset fitness tracking
    APP_DATA.user.workouts = [];
    APP_DATA.user.workoutStats = {
        totalWorkouts: 0,
        currentStreak: 0,
        longestStreak: 0,
        totalMinutes: 0
    };
    APP_DATA.user.workoutPlans = {
        activePlan: null,
        plans: [],
        customPlans: []
    };
    APP_DATA.user.bodyMetrics = {
        entries: [],
        goals: {
            targetWeight: null,
            targetBodyFat: null
        }
    };
    APP_DATA.user.supplements = {
        stack: [],
        log: []
    };
    APP_DATA.user.nutrition = {
        goals: { calories: 2000, protein: 150, carbs: 200, fat: 70 },
        log: []
    };

    // Reset TRT protocol
    APP_DATA.user.trtProtocol = {
        active: false,
        protocol: null,
        labResults: [],
        injectionLog: []
    };

    // Reset all book progress
    APP_DATA.categories.forEach(category => {
        category.books.forEach(book => {
            book.progress = 0;
            if (book.lessonList) {
                book.lessonList.forEach(lesson => {
                    lesson.completed = false;
                });
            }
        });
    });

    console.log('🔍„ Full app reset complete! All progress cleared.');
    return true;
}

// Helper function to load progress from localStorage
function loadProgress() {
    const saved = localStorage.getItem('synthesisProgress');
    if (saved) {
        const savedData = JSON.parse(saved);

        // Check version - if old version, keep default sample data
        const savedVersion = savedData._version || 1;
        if (savedVersion < DATA_VERSION) {
            console.log('Data version updated, refreshing sample data...');
            // Only restore user progress, not sample data
            if (savedData.user) {
                // Preserve specific user progress
                APP_DATA.user.xp = savedData.user.xp || 0;
                APP_DATA.user.level = savedData.user.level || 1;
                APP_DATA.user.streak = savedData.user.streak || 0;
                APP_DATA.user.totalXpEarned = savedData.user.totalXpEarned || 0;
                APP_DATA.user.booksCompleted = savedData.user.booksCompleted || 0;
                APP_DATA.user.learningStats = savedData.user.learningStats || APP_DATA.user.learningStats;
                APP_DATA.user.workouts = savedData.user.workouts || [];
                APP_DATA.user.workoutStats = savedData.user.workoutStats || APP_DATA.user.workoutStats;
                APP_DATA.user.bodyMetrics = savedData.user.bodyMetrics || APP_DATA.user.bodyMetrics;
                APP_DATA.user.supplements = savedData.user.supplements || APP_DATA.user.supplements;
                // Ensure supplements has both stack and log arrays
                if (APP_DATA.user.supplements) {
                    if (!APP_DATA.user.supplements.stack) APP_DATA.user.supplements.stack = [];
                    if (!APP_DATA.user.supplements.log) APP_DATA.user.supplements.log = [];
                }
                APP_DATA.user.nutrition = savedData.user.nutrition || APP_DATA.user.nutrition;
                APP_DATA.user.recipeIdeas = savedData.user.recipeIdeas || [];
                APP_DATA.user.recipes = savedData.user.recipes || [];
                APP_DATA.user.visionBoard = savedData.user.visionBoard || [];
                APP_DATA.user.manifestationJournal = savedData.user.manifestationJournal || [];
                APP_DATA.user.trtProtocol = savedData.user.trtProtocol || APP_DATA.user.trtProtocol;
                // Preserve challenge streaks but reset today's challenges
                if (savedData.user.dailyChallenges) {
                    APP_DATA.user.dailyChallenges.totalChallengesCompleted = savedData.user.dailyChallenges.totalChallengesCompleted || 0;
                    APP_DATA.user.dailyChallenges.currentChallengeStreak = savedData.user.dailyChallenges.currentChallengeStreak || 0;
                    APP_DATA.user.dailyChallenges.longestChallengeStreak = savedData.user.dailyChallenges.longestChallengeStreak || 0;
                }
            }
            // Save updated version
            saveProgress();
            return;
        }

        // Preserve default sample data before merging
        const defaultFlashcards = APP_DATA.user.flashcards.cards;
        const defaultSampleQuizzes = APP_DATA.user.sampleQuizzes;
        const defaultSampleFeynmanConcepts = APP_DATA.user.sampleFeynmanConcepts;

        // Merge saved progress with current data structure
        APP_DATA.user = { ...APP_DATA.user, ...savedData.user };

        // Ensure flashcards structure exists and merge sample cards
        if (!APP_DATA.user.flashcards) {
            APP_DATA.user.flashcards = { cards: [], settings: {}, stats: {} };
        }
        if (!APP_DATA.user.flashcards.cards || APP_DATA.user.flashcards.cards.length === 0) {
            APP_DATA.user.flashcards.cards = defaultFlashcards;
        }

        // Always ensure sample quizzes and Feynman concepts are available
        APP_DATA.user.sampleQuizzes = defaultSampleQuizzes;
        APP_DATA.user.sampleFeynmanConcepts = defaultSampleFeynmanConcepts;

        // Update book progress
        if (savedData.categories) {
            savedData.categories.forEach(savedCat => {
                const currentCat = APP_DATA.categories.find(c => c.id === savedCat.id);
                if (currentCat) {
                    savedCat.books.forEach(savedBook => {
                        const currentBook = currentCat.books.find(b => b.id === savedBook.id);
                        if (currentBook) {
                            currentBook.progress = savedBook.progress;
                            if (savedBook.lessonList) {
                                savedBook.lessonList.forEach((savedLesson, index) => {
                                    if (currentBook.lessonList && currentBook.lessonList[index]) {
                                        currentBook.lessonList[index].completed = savedLesson.completed;
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
    }
}

// ============================================
// INTEGRATE EXTERNAL CATEGORY MODULES
// ============================================
function integrateExternalCategories() {
    // Medical Coding category books → merged INTO the HIM category.
    // The standalone medical-coding category is no longer created.
    if (typeof MEDICAL_CODING_CATEGORY !== 'undefined') {
        const him = APP_DATA.categories.find(c => c.id === 'him');
        if (him && MEDICAL_CODING_CATEGORY.books) {
            MEDICAL_CODING_CATEGORY.books.forEach(book => {
                book.category = 'him';
                if (!him.books.some(b => b.id === book.id)) {
                    him.books.push(book);
                }
            });
            console.log('✓ Medical Coding books merged into HIM category');
        }
    }

    // Add Art History category if available
    if (typeof ART_HISTORY_CATEGORY !== 'undefined' || typeof window.ART_HISTORY_CATEGORY !== 'undefined') {
        const artHistoryData = typeof ART_HISTORY_CATEGORY !== 'undefined' ? ART_HISTORY_CATEGORY : window.ART_HISTORY_CATEGORY;
        const existingArtHistory = APP_DATA.categories.find(c => c.id === 'art-history');
        if (!existingArtHistory) {
            APP_DATA.categories.push(artHistoryData);
            console.log('✓ Art History category integrated');
        }
    }

    // New course tracks (scaffolds — seed first book + Coming Soon stubs).
    [
        'CPC_PREP_CATEGORY',
        'CCA_PREP_CATEGORY',
        'NCLEX_FOUNDATIONS_CATEGORY',
        'EXCEL_POWERBI_CATEGORY',
        'PERSONAL_FINANCE_TRACK_CATEGORY',
    ].forEach(globalName => {
        const cat = (typeof window !== 'undefined' && window[globalName])
                 || (typeof globalThis !== 'undefined' && globalThis[globalName]);
        if (!cat) return;
        if (!APP_DATA.categories.find(c => c.id === cat.id)) {
            APP_DATA.categories.push(cat);
            console.log('✓ New course category integrated:', cat.id);
        }
    });

    // External BOOKS (single books from their own files to keep data.js under
    // GitHub's 100 MB hard cap). Each is pushed into an existing category;
    // if `ensureCategory` is set and the category doesn't exist, it's created.
    const externalBooks = [
      { global: 'HITT2160_BOOK', categoryId: 'him' },
      { global: 'CDI_FUNDAMENTALS_BOOK', categoryId: 'him' },
      { global: 'HITT1349_PHARMACOLOGY_BOOK', categoryId: 'him' },
      { global: 'HITT1311_REVENUE_CYCLE_BOOK', categoryId: 'him' },
      { global: 'HITT2371_CANCER_REGISTRY_BOOK', categoryId: 'him' },
      { global: 'HIM_ANALYTICS_RESEARCH_BOOK', categoryId: 'him' },
      { global: 'HIM_AI_AUTOMATION_BOOK', categoryId: 'him' },
      { global: 'HIM_LEGAL_RECORD_BOOK', categoryId: 'him' },
      { global: 'HIM_TELEHEALTH_BOOK', categoryId: 'him' },
      { global: 'HIM_PRIVACY_BEYOND_HIPAA_BOOK', categoryId: 'him' },
      { global: 'HIM_GRADUATION_REVIEW_BOOK', categoryId: 'him' },
      { global: 'HITT_1305_BOOK', categoryId: 'him' },
      { global: 'BIOL_2401_BOOK', categoryId: 'him' },
      { global: 'BIOL_2402_BOOK', categoryId: 'him' },
      { global: 'HITT_1301_BOOK', categoryId: 'him' },
      { global: 'HITT_1341_BOOK', categoryId: 'him' },
      { global: 'HITT_1342_BOOK', categoryId: 'him' },
      { global: 'HITT_1253_BOOK', categoryId: 'him' },
      { global: 'HITT_1345_BOOK', categoryId: 'him' },
      { global: 'HITT_1211_BOOK', categoryId: 'him' },
      { global: 'HPRS_2301_BOOK', categoryId: 'him' },
      { global: 'HITT_2335_BOOK', categoryId: 'him' },
      { global: 'HITT_2246_BOOK', categoryId: 'him' },
      { global: 'HITT_1255_BOOK', categoryId: 'him' },
      { global: 'HITT_2343_BOOK', categoryId: 'him' },
      { global: 'HITT_2239_BOOK', categoryId: 'him' },
      { global: 'HITT_2149_BOOK', categoryId: 'him' },
      { global: 'AHIMA_DOMAINS_BOOK', categoryId: 'him' },
      { global: 'ANATOMY_PHYSIOLOGY_MASTERY_BOOK', categoryId: 'anatomy-physiology' },
      { global: 'CARDIOVASCULAR_DEEP_DIVE_BOOK', categoryId: 'anatomy-physiology' },
      { global: 'NEUROSCIENCE_AP_BOOK', categoryId: 'anatomy-physiology' },
      { global: 'MUSCULOSKELETAL_MASTERY_BOOK', categoryId: 'anatomy-physiology' },
      { global: 'COLLEGE_AP_SURVEY_BOOK', categoryId: 'anatomy-physiology' },
      { global: 'HUMAN_PHYSIOLOGY_BOOK', categoryId: 'anatomy-physiology' },
      { global: 'GENERAL_CHEMISTRY_BOOK', categoryId: 'anatomy-physiology' },
      { global: 'BIOCHEMISTRY_LIFE_BOOK', categoryId: 'anatomy-physiology' },
      { global: 'TECHNOLOGY_IN_ACTION_BOOK', categoryId: 'data-analytics' },
      { global: 'EXCEL_365_BOOK', categoryId: 'data-analytics' },
      { global: 'WORD_365_BOOK', categoryId: 'data-analytics' },
      { global: 'POWERPOINT_365_BOOK', categoryId: 'data-analytics' },
      { global: 'MICROSOFT_365_INTRO_BOOK', categoryId: 'data-analytics' },
      { global: 'US_HISTORY_BOOK', categoryId: 'history' },
      { global: 'ARCHAEOLOGICAL_HISTORY_BOOK', categoryId: 'history' },
      { global: 'GEOGRAPHIC_HISTORY_BOOK', categoryId: 'history' },
      { global: 'LOGIC_SCIMETHOD_BOOK', categoryId: 'critical-thinking' },
      { global: 'CLIMATE_EARTH_BOOK', categoryId: 'science' },
      { global: 'GREAT_PHYSICISTS_BOOK', categoryId: 'science' },
      { global: 'QUANTUM_REALITY_BOOK', categoryId: 'science' },
      { global: 'ASTROPHYSICS_BOOK', categoryId: 'science' },
      { global: 'PARTICLE_PHYSICS_BOOK', categoryId: 'science' },
      { global: 'RELATIVITY_BOOK', categoryId: 'science' },
      { global: 'THERMODYNAMICS_BOOK', categoryId: 'science' },
      { global: 'ELECTROMAGNETISM_BOOK', categoryId: 'science' },
      { global: 'EVERYDAY_PHYSICS_BOOK', categoryId: 'science' },
      { global: 'CHAOS_COMPLEXITY_BOOK', categoryId: 'science' },
      { global: 'NUCLEAR_RADIATION_BOOK', categoryId: 'science' },
      { global: 'WAVES_LIGHT_OPTICS_BOOK', categoryId: 'science' },
      { global: 'HEART_CIRCULATION_BOOK', categoryId: 'anatomy-physiology' },
      { global: 'BRAIN_NERVOUS_BOOK', categoryId: 'anatomy-physiology' },
      { global: 'LUNGS_RESPIRATION_BOOK', categoryId: 'anatomy-physiology' },
      { global: 'LIVER_KIDNEY_GUT_BOOK', categoryId: 'anatomy-physiology' },
      { global: 'MUSCLES_BONES_BOOK', categoryId: 'anatomy-physiology' },
      { global: 'ENDOCRINE_BOOK', categoryId: 'anatomy-physiology' },
      { global: 'IMMUNE_SYSTEM_BOOK', categoryId: 'anatomy-physiology' },
      { global: 'REPRODUCTIVE_BOOK', categoryId: 'anatomy-physiology' },
      { global: 'SKIN_SENSES_BOOK', categoryId: 'anatomy-physiology' },
      { global: 'US_CIVICS_BOOK', categoryId: 'civics-economics',
        ensureCategory: { name: 'Civics & Economics', icon: '🏛️', color: '#0ea5e9',
          description: 'Citizenship, money, and how the modern economy works.' } },
      { global: 'PERSONAL_FINANCE_BOOK', categoryId: 'civics-economics',
        ensureCategory: { name: 'Civics & Economics', icon: '🏛️', color: '#0ea5e9',
          description: 'Citizenship, money, and how the modern economy works.' } },
      { global: 'ECONOMICS_BOOK', categoryId: 'civics-economics',
        ensureCategory: { name: 'Civics & Economics', icon: '🏛️', color: '#0ea5e9',
          description: 'Citizenship, money, and how the modern economy works.' } },
      { global: 'PUBLIC_SPEAKING_BOOK', categoryId: 'communication',
        ensureCategory: { name: 'Communication', icon: '🎙️', color: '#f97316',
          description: 'Public speaking, rhetoric, and effective communication.' } },
      // Must stay after PUBLIC_SPEAKING_BOOK, which is what creates the
      // Communication category. Entries run in array order, and a book whose
      // category does not exist yet is silently dropped.
      { global: 'VOCABULARY_BUILDER_BOOK', categoryId: 'communication' },
      // Languages has no inline definition, so this entry creates it. Any further
      // language course must be registered AFTER this one, or it lands before the
      // category exists and is silently dropped.
      { global: 'SPANISH_FOUNDATIONS_BOOK', categoryId: 'languages',
        ensureCategory: { name: 'Languages', icon: '🗣️', color: '#14b8a6',
          description: 'Learn to speak, read and understand a new language from scratch.' } },
      { global: 'FRENCH_FOUNDATIONS_BOOK', categoryId: 'languages' },
      { global: 'GERMAN_FOUNDATIONS_BOOK', categoryId: 'languages' },
      { global: 'FIRST_AID_BOOK', categoryId: 'health' },
      { global: 'HEALTHIVORA_BODY_RESET_BOOK', categoryId: 'health' },
      { global: 'BODY_RESET_PLAYBOOK_BOOK', categoryId: 'health' },
      { global: 'PLAY_HAMLET_BOOK', categoryId: 'theatre-plays',
        ensureCategory: { name: 'Theatre & Plays', icon: '🎭', color: '#a855f7',
          description: 'Close-read seminars on the foundational plays — Greek tragedy, Shakespeare, modern American drama.' } },
      { global: 'PLAY_SALESMAN_BOOK', categoryId: 'theatre-plays',
        ensureCategory: { name: 'Theatre & Plays', icon: '🎭', color: '#a855f7',
          description: 'Close-read seminars on the foundational plays — Greek tragedy, Shakespeare, modern American drama.' } },
      { global: 'PLAY_OEDIPUS_BOOK', categoryId: 'theatre-plays',
        ensureCategory: { name: 'Theatre & Plays', icon: '🎭', color: '#a855f7',
          description: 'Close-read seminars on the foundational plays — Greek tragedy, Shakespeare, modern American drama.' } },
      { global: 'FIGURE_LINCOLN_BOOK', categoryId: 'famous-figures',
        ensureCategory: { name: 'Famous Historical Figures', icon: '🏛️', color: '#d97706',
          description: 'Biographical seminars on the figures who shaped world history — life, work, controversies, legacy.' } },
      { global: 'FIGURE_EINSTEIN_BOOK', categoryId: 'famous-figures',
        ensureCategory: { name: 'Famous Historical Figures', icon: '🏛️', color: '#d97706',
          description: 'Biographical seminars on the figures who shaped world history — life, work, controversies, legacy.' } },
      { global: 'FIGURE_CURIE_BOOK', categoryId: 'famous-figures',
        ensureCategory: { name: 'Famous Historical Figures', icon: '🏛️', color: '#d97706',
          description: 'Biographical seminars on the figures who shaped world history — life, work, controversies, legacy.' } },
      { global: 'FIGURE_MLK_BOOK', categoryId: 'famous-figures',
        ensureCategory: { name: 'Famous Historical Figures', icon: '🏛️', color: '#d97706',
          description: 'Biographical seminars on the figures who shaped world history — life, work, controversies, legacy.' } },
      { global: 'FIGURE_LEONARDO_BOOK', categoryId: 'famous-figures',
        ensureCategory: { name: 'Famous Historical Figures', icon: '🏛️', color: '#d97706',
          description: 'Biographical seminars on the figures who shaped world history — life, work, controversies, legacy.' } },
      { global: 'PLAY_MACBETH_BOOK', categoryId: 'theatre-plays',
        ensureCategory: { name: 'Theatre & Plays', icon: '🎭', color: '#a855f7',
          description: 'Close-read seminars on the foundational plays — Greek tragedy, Shakespeare, modern American drama.' } },
      { global: 'PLAY_ROMEO_BOOK', categoryId: 'theatre-plays',
        ensureCategory: { name: 'Theatre & Plays', icon: '🎭', color: '#a855f7',
          description: 'Close-read seminars on the foundational plays — Greek tragedy, Shakespeare, modern American drama.' } },
      { global: 'PLAY_CRUCIBLE_BOOK', categoryId: 'theatre-plays',
        ensureCategory: { name: 'Theatre & Plays', icon: '🎭', color: '#a855f7',
          description: 'Close-read seminars on the foundational plays — Greek tragedy, Shakespeare, modern American drama.' } },
      { global: 'PLAY_GODOT_BOOK', categoryId: 'theatre-plays',
        ensureCategory: { name: 'Theatre & Plays', icon: '🎭', color: '#a855f7',
          description: 'Close-read seminars on the foundational plays — Greek tragedy, Shakespeare, modern American drama.' } },
      { global: 'PLAY_STREETCAR_BOOK', categoryId: 'theatre-plays',
        ensureCategory: { name: 'Theatre & Plays', icon: '🎭', color: '#a855f7',
          description: 'Close-read seminars on the foundational plays — Greek tragedy, Shakespeare, modern American drama.' } },
      { global: 'PLAY_RAISIN_BOOK', categoryId: 'theatre-plays',
        ensureCategory: { name: 'Theatre & Plays', icon: '🎭', color: '#a855f7',
          description: 'Close-read seminars on the foundational plays — Greek tragedy, Shakespeare, modern American drama.' } },
      { global: 'FIGURE_DOUGLASS_BOOK', categoryId: 'famous-figures',
        ensureCategory: { name: 'Famous Historical Figures', icon: '🏛️', color: '#d97706',
          description: 'Biographical seminars on the figures who shaped world history — life, work, controversies, legacy.' } },
      { global: 'FIGURE_JEFFERSON_BOOK', categoryId: 'famous-figures',
        ensureCategory: { name: 'Famous Historical Figures', icon: '🏛️', color: '#d97706',
          description: 'Biographical seminars on the figures who shaped world history — life, work, controversies, legacy.' } },
      { global: 'FIGURE_WASHINGTON_BOOK', categoryId: 'famous-figures',
        ensureCategory: { name: 'Famous Historical Figures', icon: '🏛️', color: '#d97706',
          description: 'Biographical seminars on the figures who shaped world history — life, work, controversies, legacy.' } },
      { global: 'FIGURE_CHURCHILL_BOOK', categoryId: 'famous-figures',
        ensureCategory: { name: 'Famous Historical Figures', icon: '🏛️', color: '#d97706',
          description: 'Biographical seminars on the figures who shaped world history — life, work, controversies, legacy.' } },
      { global: 'FIGURE_TESLA_BOOK', categoryId: 'famous-figures',
        ensureCategory: { name: 'Famous Historical Figures', icon: '🏛️', color: '#d97706',
          description: 'Biographical seminars on the figures who shaped world history — life, work, controversies, legacy.' } },
      { global: 'FIGURE_FDR_BOOK', categoryId: 'famous-figures',
        ensureCategory: { name: 'Famous Historical Figures', icon: '🏛️', color: '#d97706',
          description: 'Biographical seminars on the figures who shaped world history — life, work, controversies, legacy.' } },
      { global: 'FIGURE_MANDELA_BOOK', categoryId: 'famous-figures',
        ensureCategory: { name: 'Famous Historical Figures', icon: '🏛️', color: '#d97706',
          description: 'Biographical seminars on the figures who shaped world history — life, work, controversies, legacy.' } },
      { global: 'FIGURE_DARWIN_BOOK', categoryId: 'famous-figures',
        ensureCategory: { name: 'Famous Historical Figures', icon: '🏛️', color: '#d97706',
          description: 'Biographical seminars on the figures who shaped world history — life, work, controversies, legacy.' } },
      { global: 'FIGURE_GANDHI_BOOK', categoryId: 'famous-figures',
        ensureCategory: { name: 'Famous Historical Figures', icon: '🏛️', color: '#d97706',
          description: 'Biographical seminars on the figures who shaped world history — life, work, controversies, legacy.' } },
      { global: 'FIGURE_TRUTH_BOOK', categoryId: 'famous-figures',
        ensureCategory: { name: 'Famous Historical Figures', icon: '🏛️', color: '#d97706',
          description: 'Biographical seminars on the figures who shaped world history — life, work, controversies, legacy.' } },
      { global: 'FIGURE_NEWTON_BOOK', categoryId: 'famous-figures',
        ensureCategory: { name: 'Famous Historical Figures', icon: '🏛️', color: '#d97706',
          description: 'Biographical seminars on the figures who shaped world history — life, work, controversies, legacy.' } },
      { global: 'FIGURE_GALILEO_BOOK', categoryId: 'famous-figures',
        ensureCategory: { name: 'Famous Historical Figures', icon: '🏛️', color: '#d97706',
          description: 'Biographical seminars on the figures who shaped world history — life, work, controversies, legacy.' } },
      { global: 'FIGURE_TURING_BOOK', categoryId: 'famous-figures',
        ensureCategory: { name: 'Famous Historical Figures', icon: '🏛️', color: '#d97706',
          description: 'Biographical seminars on the figures who shaped world history — life, work, controversies, legacy.' } },
      { global: 'FIGURE_HAWKING_BOOK', categoryId: 'famous-figures',
        ensureCategory: { name: 'Famous Historical Figures', icon: '🏛️', color: '#d97706',
          description: 'Biographical seminars on the figures who shaped world history — life, work, controversies, legacy.' } },
      { global: 'FIGURE_CLEOPATRA_BOOK', categoryId: 'famous-figures',
        ensureCategory: { name: 'Famous Historical Figures', icon: '🏛️', color: '#d97706',
          description: 'Biographical seminars on the figures who shaped world history — life, work, controversies, legacy.' } },
      { global: 'FIGURE_BEETHOVEN_BOOK', categoryId: 'famous-figures',
        ensureCategory: { name: 'Famous Historical Figures', icon: '🏛️', color: '#d97706',
          description: 'Biographical seminars on the figures who shaped world history — life, work, controversies, legacy.' } },
      { global: 'FIGURE_JOBS_BOOK', categoryId: 'famous-figures',
        ensureCategory: { name: 'Famous Historical Figures', icon: '🏛️', color: '#d97706',
          description: 'Biographical seminars on the figures who shaped world history — life, work, controversies, legacy.' } },
      { global: 'MUSIC_THEORY_BOOK', categoryId: 'arts',
        ensureCategory: { name: 'Arts & Culture', icon: '🎨', color: '#ec4899',
          description: 'Music, theatre, visual art, literature, and aesthetic literacy.' } },
      { global: 'COOKING_BOOK', categoryId: 'life-skills',
        ensureCategory: { name: 'Life Skills', icon: '🛠️', color: '#10b981',
          description: 'Practical everyday literacies — cooking, money, repair, communication.' } },
      { global: 'INVENTIONS_BOOK', categoryId: 'science' },
      { global: 'NEGOTIATION_BOOK', categoryId: 'career-success' },
      { global: 'ASTRONOMY_BOOK', categoryId: 'science' },
      { global: 'CON_LAW_BOOK', categoryId: 'civics-economics',
        ensureCategory: { name: 'Civics & Economics', icon: '🏛️', color: '#0ea5e9',
          description: 'Citizenship, money, and how the modern economy works.' } },
      { global: 'ETHICS_BOOK', categoryId: 'philosophy' },
      { global: 'LINGUISTICS_BOOK', categoryId: 'arts',
        ensureCategory: { name: 'Arts & Culture', icon: '🎨', color: '#ec4899',
          description: 'Music, theatre, visual art, literature, and aesthetic literacy.' } },
      { global: 'WORLD_MYTHOLOGY_BOOK', categoryId: 'arts',
        ensureCategory: { name: 'Arts & Culture', icon: '🎨', color: '#ec4899',
          description: 'Music, theatre, visual art, literature, and aesthetic literacy.' } },
      { global: 'SAPIENS_BOOK', categoryId: 'science' },
      { global: 'SAPIENS_BOOK', categoryId: 'history' },
      { global: 'GUNS_GERMS_STEEL_BOOK', categoryId: 'history' },
      { global: 'SIXTH_EXTINCTION_BOOK', categoryId: 'history' },
      { global: 'HOMO_DEUS_BOOK', categoryId: 'history' },
      { global: 'BOOK_1491', categoryId: 'history' },
      { global: 'SILK_ROADS_BOOK', categoryId: 'history' },
      { global: 'SPQR_BOOK', categoryId: 'history' },
      { global: 'OPERATOR_TO_OWNER_BOOK', categoryId: 'business' },
      { global: 'CRITICAL_THINKING_LOGIC_BOOK', categoryId: 'philosophy-college' },
      { global: 'ROMAN_MEDIEVAL_ISLAMIC_BOOK', categoryId: 'philosophy-college' },
      { global: 'RATIONALISTS_EMPIRICISTS_BOOK', categoryId: 'philosophy-college' },
      { global: 'KANT_GERMAN_IDEALISM_BOOK', categoryId: 'philosophy-college' },
      { global: 'NINETEENTH_CENTURY_REBELS_BOOK', categoryId: 'philosophy-college' },
      { global: 'DEEP_WORK_EXT_BOOK', categoryId: 'productivity' },
      { global: 'EAT_FROG_EXT_BOOK', categoryId: 'productivity' },
      { global: 'ONE_THING_EXT_BOOK', categoryId: 'productivity' },
      { global: 'MAKE_TIME_EXT_BOOK', categoryId: 'productivity' },
      { global: 'EXISTENTIALISM_PHENOMENOLOGY_BOOK', categoryId: 'philosophy-college' },
      { global: 'HYPERFOCUS_EXT_BOOK', categoryId: 'productivity' },
      { global: 'FRANKL_EXT_BOOK', categoryId: 'philosophy' },
      { global: 'HAPPINESS_EXT_BOOK', categoryId: 'philosophy' },
      { global: 'MONK_EXT_BOOK', categoryId: 'personal-development' },
      { global: 'SUBTLE_ART_EXT_BOOK', categoryId: 'personal-development' },
      { global: 'MODERN_CONTEMPORARY_PHILOSOPHY_BOOK', categoryId: 'philosophy-college' },
      { global: 'EASTERN_PHILOSOPHY_BOOK', categoryId: 'philosophy-college' },
      { global: 'RICH_DAD_EXT_BOOK', categoryId: 'personal-development' },
      { global: 'GRIT_EXT_BOOK', categoryId: 'personal-development' },
      { global: 'OUTLIERS_EXT_BOOK', categoryId: 'personal-development' },
      { global: 'GIFTS_IMPERFECTION_EXT_BOOK', categoryId: 'personal-development' },
      { global: 'PSYCHO_CYBERNETICS_EXT_BOOK', categoryId: 'personal-development' },
      { global: 'ZERO_TO_ONE_EXT_BOOK', categoryId: 'business' },
      { global: 'WIN_FRIENDS_EXT_BOOK', categoryId: 'business' },
      { global: 'NEVER_SPLIT_EXT_BOOK', categoryId: 'business' },
      { global: 'START_WITH_WHY_EXT_BOOK', categoryId: 'leadership' },
      { global: 'DARE_TO_LEAD_EXT_BOOK', categoryId: 'leadership' },
      { global: 'OBSTACLE_WAY_PHILO_EXT_BOOK', categoryId: 'philosophy' },
      { global: 'ESSENTIALISM_EXT_BOOK', categoryId: 'productivity' },
      { global: 'FOUR_HOUR_WORKWEEK_EXT_BOOK', categoryId: 'productivity' },
      { global: 'COURAGE_DISLIKED_EXT_BOOK', categoryId: 'philosophy' },
      { global: 'CANT_HURT_ME_EXT_BOOK', categoryId: 'personal-development' },
      { global: 'ART_OF_LIVING_EXT_BOOK', categoryId: 'philosophy' },
      { global: 'THE_PROPHET_EXT_BOOK', categoryId: 'philosophy' },
      { global: 'IN_DEFENSE_FOOD_EXT_BOOK', categoryId: 'health' },
      { global: 'IKIGAI_EXT_BOOK', categoryId: 'health' },
      { global: 'LEAN_STARTUP_EXT_BOOK', categoryId: 'business' },
      { global: 'GOOD_TO_GREAT_EXT_BOOK', categoryId: 'business' },
      { global: 'EXTREME_OWNERSHIP_EXT_BOOK', categoryId: 'leadership' },
      { global: 'LEADERS_EAT_LAST_EXT_BOOK', categoryId: 'leadership' },
      { global: 'FIVE_DYSFUNCTIONS_EXT_BOOK', categoryId: 'leadership' },
      { global: 'TURN_THE_SHIP_EXT_BOOK', categoryId: 'leadership' },
      { global: 'PRIMAL_LEADERSHIP_EXT_BOOK', categoryId: 'leadership' },
      { global: 'THINKING_FOR_YOURSELF_EXT_BOOK', categoryId: 'critical-thinking' },
      { global: 'SHERLOCK_EXT_BOOK', categoryId: 'critical-thinking' },
      { global: 'CONTENT_MARKETING_EXT_BOOK', categoryId: 'seo-marketing' },
      { global: 'BUILDING_STORYBRAND_EXT_BOOK', categoryId: 'seo-marketing' },
      { global: 'LOCAL_SEO_EXT_BOOK', categoryId: 'seo-marketing' },
      { global: 'INNOVATORS_DILEMMA_EXT_BOOK', categoryId: 'business' },
      { global: 'BUILT_TO_LAST_EXT_BOOK', categoryId: 'business' },
      { global: 'E_MYTH_EXT_BOOK', categoryId: 'business' },
      { global: 'CROSSING_CHASM_EXT_BOOK', categoryId: 'business' },
      { global: 'HARD_THING_EXT_BOOK', categoryId: 'business' },
      { global: 'SO_GOOD_EXT_BOOK', categoryId: 'career-success' },
      { global: 'FREELANCE_FREEDOM_EXT_BOOK', categoryId: 'career-success' },
      { global: 'GTD_EXT_BOOK', categoryId: 'productivity' },
      { global: 'SACKS_EXT_BOOK', categoryId: 'psychology' },
      { global: 'OBESITY_CODE_EXT_BOOK', categoryId: 'health' },
      { global: 'FORTY_EIGHT_LAWS_EXT_BOOK', categoryId: 'leadership' },
      { global: 'FEYNMAN_EXT_BOOK', categoryId: 'science' },
      { global: 'LETTERS_STOIC_EXT_BOOK', categoryId: 'philosophy' },
      { global: 'GROWTH_HACKING_EXT_BOOK', categoryId: 'seo-marketing' },
      { global: 'MILLION_DOLLAR_CONSULTANT_EXT_BOOK', categoryId: 'career-success' },
      { global: 'BREATH_HEALTH_EXT_BOOK', categoryId: 'health' },
      // Cross-listed: health-wellness shows the same book object as health, so
      // getBookById() resolves to it from either category. (Two separate copies
      // sharing the id "breath" meant one was permanently unreachable.)
      { global: 'BREATH_HEALTH_EXT_BOOK', categoryId: 'health-wellness' },
      { global: 'BLUE_ZONES_EXT_BOOK', categoryId: 'health' },
      { global: 'MEDITATIONS_PHILO_EXT_BOOK', categoryId: 'philosophy' },
      { global: 'ENCHIRIDION_EXT_BOOK', categoryId: 'stoicism' },
      { global: 'LETTERS_FROM_STOIC_EXT_BOOK', categoryId: 'stoicism' },
      { global: 'EGO_IS_ENEMY_EXT_BOOK', categoryId: 'stoicism' },
      { global: 'EMOTIONAL_INTELLIGENCE_EXT_BOOK', categoryId: 'psychology' },
      { global: 'SEVEN_HABITS_EXT_BOOK', categoryId: 'personal-development' },
      { global: 'WHY_WE_SLEEP_EXT_BOOK', categoryId: 'health' },
      { global: 'LIFESPAN_HEALTH_EXT_BOOK', categoryId: 'health' },
      // Cross-listed into both categories — see the note on BREATH above.
      { global: 'LIFESPAN_HEALTH_EXT_BOOK', categoryId: 'health-wellness' },
      { global: 'COSMOS_EXT_BOOK', categoryId: 'science' },
      { global: 'ART_THINKING_CLEARLY_EXT_BOOK', categoryId: 'critical-thinking' },
      { global: 'OBSTACLE_WAY_STOIC_EXT_BOOK', categoryId: 'stoicism' },
      { global: 'HUBERMAN_EXT_BOOK', categoryId: 'health-wellness' },
      { global: 'THE_ALCHEMIST_EXT_BOOK', categoryId: 'philosophy' },
      { global: 'BODY_KEEPS_SCORE_EXT_BOOK', categoryId: 'health' },
      { global: 'QUANTUM_MECHANICS_EXT_BOOK', categoryId: 'science' },
      { global: 'NEUROSCIENCE_EXT_BOOK', categoryId: 'science' },
      { global: 'STATS_LITERACY_EXT_BOOK', categoryId: 'critical-thinking' },
      { global: 'MEDITATIONS_STOIC_EXT_BOOK', categoryId: 'stoicism' },
      { global: 'BODY_KEEPS_SCORE_FULL_EXT_BOOK', categoryId: 'health-wellness' },
      { global: 'SEO_MASTERY_EXT_BOOK', categoryId: 'seo-marketing' },
      { global: 'METABOLIC_HEALTH_AGING_BOOK', categoryId: 'health' },
      // Cross-listed into both categories — see the note on BREATH above.
      { global: 'METABOLIC_HEALTH_AGING_BOOK', categoryId: 'health-wellness' },
      { global: 'LONGEVITY_CODE_BOOK', categoryId: 'health' },
      // Cross-listed into both categories — see the note on BREATH above.
      { global: 'LONGEVITY_CODE_BOOK', categoryId: 'health-wellness' },
      { global: 'HORMONES_MESSENGERS_BOOK', categoryId: 'health' },
      // Cross-listed into both categories — see the note on BREATH above.
      { global: 'HORMONES_MESSENGERS_BOOK', categoryId: 'health-wellness' },
      { global: 'STRENGTH_BLUEPRINT_BOOK', categoryId: 'health' },
      // Cross-listed into both categories — see the note on BREATH above.
      { global: 'STRENGTH_BLUEPRINT_BOOK', categoryId: 'health-wellness' },
      { global: 'GUT_SECOND_BRAIN_BOOK', categoryId: 'health' },
      // Cross-listed into both categories — see the note on BREATH above.
      { global: 'GUT_SECOND_BRAIN_BOOK', categoryId: 'health-wellness' },
      { global: 'BRAIN_SPAN_BOOK', categoryId: 'health' },
      // Cross-listed into both categories — see the note on BREATH above.
      { global: 'BRAIN_SPAN_BOOK', categoryId: 'health-wellness' },
      { global: 'HEART_OF_THE_MATTER_BOOK', categoryId: 'health' },
      // Cross-listed into both categories — see the note on BREATH above.
      { global: 'HEART_OF_THE_MATTER_BOOK', categoryId: 'health-wellness' },
      { global: 'MIND_REPAIR_KIT_BOOK', categoryId: 'health' },
      // Cross-listed into both categories — see the note on BREATH above.
      { global: 'MIND_REPAIR_KIT_BOOK', categoryId: 'health-wellness' },
      { global: 'WEIGHT_DEBATE_BOOK', categoryId: 'health' },
      // Cross-listed into both categories — see the note on BREATH above.
      { global: 'WEIGHT_DEBATE_BOOK', categoryId: 'health-wellness' },
      { global: 'SCREENING_MAP_BOOK', categoryId: 'health' },
      // Cross-listed into both categories — see the note on BREATH above.
      { global: 'SCREENING_MAP_BOOK', categoryId: 'health-wellness' },
      { global: 'INNER_ARMY_BOOK', categoryId: 'health' },
      // Cross-listed into both categories — see the note on BREATH above.
      { global: 'INNER_ARMY_BOOK', categoryId: 'health-wellness' },
      { global: 'MOVE_AGAIN_BOOK', categoryId: 'health' },
      // Cross-listed into both categories — see the note on BREATH above.
      { global: 'MOVE_AGAIN_BOOK', categoryId: 'health-wellness' },
      { global: 'HER_HIS_HEALTH_BOOK', categoryId: 'health' },
      // Cross-listed into both categories — see the note on BREATH above.
      { global: 'HER_HIS_HEALTH_BOOK', categoryId: 'health-wellness' },
      { global: 'KITCHEN_PHARMACY_BOOK', categoryId: 'health' },
      // Cross-listed into both categories — see the note on BREATH above.
      { global: 'KITCHEN_PHARMACY_BOOK', categoryId: 'health-wellness' },
      { global: 'EVERYDAY_POISONS_BOOK', categoryId: 'health' },
      // Cross-listed into both categories — see the note on BREATH above.
      { global: 'EVERYDAY_POISONS_BOOK', categoryId: 'health-wellness' },
      // Ayn Rand has no inline definition; this first entry creates the category.
      // Any later Rand book must come after it or it is silently dropped.
      { global: 'RAND_ANTHEM_BOOK', categoryId: 'ayn-rand',
        ensureCategory: { name: 'Ayn Rand', icon: '🏙️', color: '#d4a017',
          description: 'Seminars on Ayn Rand\'s best sellers -- the novels, the essays, the philosophy of Objectivism, and the arguments for and against.' } },
      { global: 'RAND_ATLAS_SHRUGGED_BOOK', categoryId: 'ayn-rand' },
      { global: 'RAND_VIRTUE_OF_SELFISHNESS_BOOK', categoryId: 'ayn-rand' }
    ];
    externalBooks.forEach(({ global, categoryId, ensureCategory }) => {
        const book = (typeof window !== 'undefined' && window[global]) ||
                     (typeof globalThis !== 'undefined' && globalThis[global]);
        if (!book) return;
        let cat = APP_DATA.categories.find(c => c.id === categoryId);
        if (!cat && ensureCategory) {
            cat = { id: categoryId, ...ensureCategory, books: [] };
            APP_DATA.categories.push(cat);
            console.log('✓ External category created:', categoryId);
        }
        if (!cat) return;
        const existing = cat.books.findIndex(b => b.id === book.id);
        if (existing >= 0) cat.books[existing] = book;
        else cat.books.push(book);
        console.log('✓ External book integrated:', book.id, '→', categoryId);
    });
}

// Check for updates to coding guidelines (call this on app init or periodically)
function checkForCodingUpdates() {
    if (typeof CODING_UPDATES !== 'undefined') {
        const lastChecked = localStorage.getItem('codingUpdatesLastChecked');
        const today = new Date().toISOString().split('T')[0];

        if (lastChecked !== today) {
            localStorage.setItem('codingUpdatesLastChecked', today);

            // Check for upcoming changes
            if (CODING_UPDATES.upcomingChanges && CODING_UPDATES.upcomingChanges.length > 0) {
                const upcoming = CODING_UPDATES.upcomingChanges.filter(change => {
                    const effectiveDate = new Date(change.effectiveDate);
                    const now = new Date();
                    const daysUntil = Math.ceil((effectiveDate - now) / (1000 * 60 * 60 * 24));
                    return daysUntil > 0 && daysUntil <= 30; // Alert 30 days before
                });

                if (upcoming.length > 0) {
                    return {
                        hasUpcoming: true,
                        changes: upcoming
                    };
                }
            }
        }
    }
    return { hasUpcoming: false };
}

// Initialize on load
integrateExternalCategories();

// One-time progress reset (fires once per browser, then never again).
// Bump the sentinel key to trigger a future reset.
const RESET_SENTINEL = 'synthesis_reset_2026_06_10_v4';
// Force-reset via URL: append ?reset=1 (or #reset) to the app URL to force a wipe
// regardless of sentinel state. Stays effective across cache misses.
const FORCE_RESET = typeof location !== 'undefined' &&
    (/[?&]reset=1\b/.test(location.search) || /#reset\b/.test(location.hash));
if (FORCE_RESET || !localStorage.getItem(RESET_SENTINEL)) {
    try {
        // Nuke every Synthesis-owned key in localStorage
        Object.keys(localStorage).forEach(k => {
            if (k === RESET_SENTINEL) return;
            if (k.toLowerCase().includes('synthesis') ||
                k === 'codingUpdatesLastChecked' ||
                k === 'lastVisit') {
                localStorage.removeItem(k);
            }
        });
        // Force runtime defaults for lesson/book progress in case any
        // already-loaded script kept stale state in APP_DATA.
        if (typeof APP_DATA !== 'undefined' && APP_DATA.categories) {
            APP_DATA.categories.forEach(c => {
                (c.books || []).forEach(b => {
                    b.progress = 0;
                    if (Array.isArray(b.lessonList)) {
                        b.lessonList.forEach(l => { l.completed = false; });
                    }
                });
            });
        }
        localStorage.setItem(RESET_SENTINEL, new Date().toISOString());
        console.log('Synthesis: one-time progress reset applied.');
    } catch (e) {
        console.error('Reset failed:', e);
    }
}

loadProgress();


