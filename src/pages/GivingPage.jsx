import React from 'react';

const GivingOption = ({ title, children }) => (
    <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-blue-800 mb-4">{title}</h3>
        <div className="text-gray-700 space-y-2">{children}</div>
    </div>
);

const GivingPage = () => {
    return (
        <div className="bg-gray-50 py-16">
            <section className="container mx-auto px-6 text-center">
                <i className="fas fa-hand-holding-heart text-6xl text-blue-500 mb-4"></i>
                <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Partner With Us Through Giving</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
                    Your generous giving enables us to fulfill our mission of reaching our community for Christ. Every contribution is a seed sown into fertile ground, bringing forth a harvest of transformed lives. We thank you for your faithfulness and support.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    
                    {/* Mobile Money Updated */}
                    <GivingOption title="Mobile Money">
                        <p><span className="font-bold">MTN:</span> 0784 290 507 (Vicent Mbalangu)</p>
                        <p><span className="font-bold">Airtel:</span> 0702 8699 102 (Vicent Mbalangu)</p>
                    </GivingOption>

                    {/* New MoMo Pay Option */}
                    <GivingOption title="MoMo Pay">
                        <p><span className="font-bold">Code:</span> 941940</p>
                        <p><span className="font-bold">Name:</span> Vincent Victor</p>
                    </GivingOption>

                    {/* Bank Option */}
                    <GivingOption title="Bank Deposit">
                        <p><span className="font-bold">Bank:</span> KCB Bank</p>
                        <p><span className="font-bold">Account Name:</span> Victory Church Masajja</p>
                        <p><span className="font-bold">Account Number:</span> 2203132965</p>
                    </GivingOption>
                </div>
            </section>
        </div>
    );
};

export default GivingPage;
