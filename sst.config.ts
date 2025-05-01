/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: 'toplam-web',
			removal: input?.stage === 'production' ? 'retain' : 'remove',
			protect: ['production'].includes(input?.stage),
			home: 'local',
			providers: { hcloud: '1.22.1', tls: '5.2.0' }
		};
	},
	async run() {
		const sshKeyLocal = new tls.PrivateKey('SSH Key - Local', {
			algorithm: 'ED25519'
		});

		// Add the SSH key to Hetzner
		const sshKeyHetzner = new hcloud.SshKey('SSH Key - Hetzner', {
			publicKey: sshKeyLocal.publicKeyOpenssh
		});
	}
});
