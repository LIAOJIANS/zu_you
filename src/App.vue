<script>
export default {
	onLaunch: function() {
		// 监听用户是否断网
		this.lib.NetWork.On();
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
@import './common/index.css';
@import './common/icon.css';
@import './common/animate.css';
</style>
