import config from "../../../config"

export default ({}) => ({
    get: name => config[name]()
})