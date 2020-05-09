using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace React.Native.Sven.RNReactNativeSven
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNReactNativeSvenModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNReactNativeSvenModule"/>.
        /// </summary>
        internal RNReactNativeSvenModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNReactNativeSven";
            }
        }
    }
}
