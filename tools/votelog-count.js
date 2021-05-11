import yaml from "js-yaml"
import fs from "fs"

const VOTELOG_PATH = "./src/contents/votelog.yaml"
const PEOPLE_VOTE_PATH = "./src/contents/people_vote.yaml"

try {
  const [votelogData, peopleVoteData] = [
    VOTELOG_PATH,
    PEOPLE_VOTE_PATH,
  ].map(path => yaml.load(fs.readFileSync(path, "utf8")))

  const countedVotelog = votelogData.map(topic => {
    const {
      "1": approve,
      "2": disprove,
      "3": abstained,
      "4": absent,
      total_voter,
    } = peopleVoteData.reduce(
      (countObj, { votelog }) => {
        const vote = votelog.find(({ key }) => key === topic.id)

        if (vote) {
          countObj[vote.value]++
          countObj.total_voter++
        }

        return countObj
      },
      { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "-": 0, total_voter: 0 }
    )

    // const countKeys = ["approve", "disprove", "abstained", "absent"]
    // const counts = { approve, disprove, abstained, absent }

    // countKeys.forEach((countKey, index) => {
    //   if (topic[countKey] !== counts[countKey])
    //     console.log(
    //       `topic id ${topic.id}: ${countKey} (${index + 1}) ${
    //         topic[countKey]
    //       } => ${counts[countKey]}`
    //     )
    // })

    // console.log({
    //   approve,
    //   disprove,
    //   abstained,
    //   absent,
    //   total_voter,
    // })

    return {
      ...topic,
      approve,
      disprove,
      abstained,
      absent,
      total_voter,
    }
  })

  fs.writeFileSync(VOTELOG_PATH, yaml.safeDump(countedVotelog, {}))
} catch (e) {
  console.error(e)
}
