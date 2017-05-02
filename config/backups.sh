#!/bin/bash
####################################
#
# Backup Locally.
#
####################################

# What to backup.
backup_files="/var/www/html"

# Where to backup to.
dest="/home/travelaer/backups/files"

# Create archive filename.
day=$(date +%m%d%y)
hostname=$(hostname -s)
archive_file="$hostname-$day.tgz"

# Print start status message.
echo "Backing up $backup_files to $dest/$archive_file"
date
echo

# Backup the files using tar.
tar czvpf $dest/$archive_file $backup_files

# Delete files older than 7 days
echo
echo "Deleting backups older than 7 days..."
find /home/travelaer/backups/files* -mtime +7 -exec rm {} \;

# Print end status message.
echo "Backup finished"
echo

date

# Long listing of files in $dest to check file sizes.
ls -lh $dest
