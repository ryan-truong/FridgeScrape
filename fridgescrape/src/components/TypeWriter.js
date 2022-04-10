import TypeWriterEffect from 'react-typewriter-effect'


export const TypeWriter = () => {
  return (
    <div className = 'typewriter'>
        <TypeWriterEffect textStyle = {{fontSize: '25px'}}multiText={['type ingredients with comma separation', 'tomatoes, pasta, beef, onions', 'find inspiration for your next meal']} multiTextDelay = {300} typeSpeed={60} hideCursorAfterText={true}/>
    </div>
  )
}

export default TypeWriter;