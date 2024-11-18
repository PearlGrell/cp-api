const fetch = require('node-fetch-commonjs');
const { parse } = require('node-html-parser');

exports.fetchGeeksForGeeksData = async (username ) => {

  const baseUrl = 'https://auth.geeksforgeeks.org/user/'
  const url = `${baseUrl}${username}/practice/`

  try {
    const response = await fetch(url)
    const html = await response.text()
    const document = parse(html)

    const name = document.querySelector('.userName')?.text.trim() || username
    const profilePhoto = document.querySelector('.profile_pic')?.getAttribute('src') || 'N/A'
    const instituteRank = document.querySelector('.rankNum')?.text.trim() || 'N/A'

    if(profilePhoto === 'N/A') {
        return {message: 'User not found'}
    }

    const streakElement = document.querySelector('.streakCnt')?.text.replace(/ /g, '').split('/') || ['00', '00']
    const [currentStreak, maxStreak] = streakElement

    const institution = document.querySelector('.basic_details_data')?.text.trim() || 'N/A'
    const scoreCards = document.querySelectorAll('.score_card_value')
    const codingScore = scoreCards?.[0]?.text.trim() || '0'
    const totalProblemsSolved = scoreCards?.[1]?.text.trim() || '0'

    const difficulties = ['school', 'easy', 'medium', 'hard']
    const solvedStats = {}
    difficulties.forEach((difficulty) => {
      const element = document.querySelector(`#${difficulty}`)
      solvedStats[difficulty] = element?.querySelectorAll('a').length || 0
    })

    return {
        name: name,
        profilePhoto: profilePhoto,
        instituteRank: instituteRank,
        currentStreak: currentStreak,
        maxStreak: maxStreak,
        institution: institution,
        codingScore: codingScore,
        totalProblemsSolved: totalProblemsSolved,
        solvedStats: solvedStats,
      }

  } catch (error) {
    console.error('Error fetching GFG data:', error)
    return { message: error?.message };
  }
}
