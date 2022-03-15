import shimmerStyles from './Shimmer.module.scss'

export const Shimmer = () => {
  return (
    <div className={shimmerStyles.shimmer_wrapper}>
      <div className={shimmerStyles.shimmer}></div>
    </div>
  )
}
