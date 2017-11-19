type AppState = {
  days: Array<Day>,
  filters: Filters
}

type Day = {
  uuid: number,
  user: number,
  sleepingQuality: String,
  tirednessFeeling: String
}

type Filters = {
  metrics: String,
  year: number
}
type State = { app: AppState }; // this will also contain router state


// TODO: remove hardcore data
const initialState: State = {
  app: {
    days: [],
    filters: {
        metrics: 'sleepQuality',
        year: 2017
    }
  }
}

type GetCalendarByYear = {}
type GetEntry = {}
type PostEntry = {}
type PutEntry = {}
type DeleteEntry = {}
type SelectFilter = {}
type SeleectYear = {}
type Action = RouterAction<State> | ''

