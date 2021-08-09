export const createRule =
  validate =>
  async ({ data, path, pushError }) => {
    try {
      let nextData = await validate(data)
      return nextData
    } catch (error) {
      pushError({ message: error.message, path })
      return data
    }
  }
