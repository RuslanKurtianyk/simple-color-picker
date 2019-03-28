import jss, { SheetsRegistry }  from 'jss'
import preset from 'jss-preset-default'
import styles from './styles'

jss.setup(preset())

const sheets = new SheetsRegistry()
const styleSheet = jss.createStyleSheet(styles).attach()
sheets.add(styleSheet)

export default sheets