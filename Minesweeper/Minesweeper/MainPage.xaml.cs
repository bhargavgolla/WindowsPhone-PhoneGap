/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License. 
*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;
using Microsoft.Phone.Controls;
using System.IO;
using System.Windows.Media.Imaging;
using System.Windows.Resources;
using Microsoft.Phone.Shell;
using Microsoft.Phone.Tasks;


namespace Minesweeper
{
    public partial class MainPage : PhoneApplicationPage
    {
        // Constructor
        public MainPage()
        {
            InitializeComponent();
            ApplicationBar = new ApplicationBar();
            ApplicationBar.Opacity = 1;
            ApplicationBar.IsVisible = true;
            ApplicationBar.IsMenuEnabled = true;
            /*Mail AppBar*/
            ApplicationBarIconButton button1 = new ApplicationBarIconButton();
            if ((Visibility)App.Current.Resources["PhoneDarkThemeVisibility"] == Visibility.Visible)
            {
                button1.IconUri = new Uri("/Images/dark/appbar.feature.email.rest.png", UriKind.Relative);
            }
            else
            {
                button1.IconUri = new Uri("/Images/light/appbar.feature.email.rest.png", UriKind.Relative);
            }
            button1.Text = "Mail";
            ApplicationBar.Buttons.Add(button1);
            button1.Click += new EventHandler(email_Click);

            /*Facebook Appbar*/
            ApplicationBarIconButton button2 = new ApplicationBarIconButton();
            if ((Visibility)App.Current.Resources["PhoneDarkThemeVisibility"] == Visibility.Visible)
            {
                button2.IconUri = new Uri("/Images/dark/appbar.share.rest.png", UriKind.Relative);
            }
            else
            {
                button2.IconUri = new Uri("/Images/light/appbar.share.rest.png", UriKind.Relative);
            }
            button2.Text = "Share";
            ApplicationBar.Buttons.Add(button2);
            button2.Click += new EventHandler(fb_Click);

            ApplicationBarMenuItem menuItem1 = new ApplicationBarMenuItem();
            menuItem1.Text = "Share this app with your Friends";
            ApplicationBar.MenuItems.Add(menuItem1);
            this.CordovaView.Loaded += CordovaView_Loaded;
        }

        private void CordovaView_Loaded(object sender, RoutedEventArgs e)
        {
            this.CordovaView.Loaded -= CordovaView_Loaded;
            // first time load will have an animation
            Storyboard _storyBoard = new Storyboard();
            DoubleAnimation animation = new DoubleAnimation()
            {
                From = 0,
                Duration = TimeSpan.FromSeconds(0.6),
                To = 90
            };
            Storyboard.SetTarget(animation, SplashProjector);
            Storyboard.SetTargetProperty(animation, new PropertyPath("RotationY"));
            _storyBoard.Children.Add(animation);
            _storyBoard.Begin();
            _storyBoard.Completed += Splash_Completed;
        }

        void Splash_Completed(object sender, EventArgs e)
        {
            (sender as Storyboard).Completed -= Splash_Completed;
            LayoutRoot.Children.Remove(SplashImage);
        }
        private void email_Click(object sender, EventArgs e)
        {
            EmailComposeTask task = new EmailComposeTask();
            task.Subject = "Have you checked this WP App: Minesweeper??";
            task.Body = "Hey check out this great WP App named Minesweeper. You can find it on http://www.windowsphone.com/s?appid=a9502b4c-ff2b-4ad6-9fad-7756a104a96c";
            task.Show();
        }

        private void fb_Click(object sender, EventArgs e)
        {
            ShareLinkTask shareLinkTask = new ShareLinkTask();
            shareLinkTask.LinkUri = new Uri("http://www.windowsphone.com/s?appid=a9502b4c-ff2b-4ad6-9fad-7756a104a96c", UriKind.Absolute);
            shareLinkTask.Message = "Have you checked out this WP App: Minesweeper??";
            shareLinkTask.Show();
        }
    }
}
